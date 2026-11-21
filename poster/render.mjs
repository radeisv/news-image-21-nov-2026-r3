#!/usr/bin/env node
// Builds poster.html, then screenshots it at exactly 1024x1024 through the
// Chrome DevTools protocol with captureBeyondViewport (the plain CLI
// --screenshot silently drops the bottom ~84px of this page). Written fresh.
import { execFileSync, spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import http from "node:http";

const here = dirname(fileURLToPath(import.meta.url));
const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1148/chrome-linux/chrome`;
const RAW = join(here, "entry-raw.png");
const OUT = join(here, "entry.png");

execFileSync("node", [join(here, "build.mjs")], { stdio: "inherit" });

const profile = mkdtempSync(join(tmpdir(), "news21-r3-"));
const port = 9500 + (process.pid % 50);
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fetchJson = (path) => new Promise((resolve, reject) => {
  const req = http.get({ host: "127.0.0.1", port, path }, (res) => {
    let body = "";
    res.on("data", (c) => (body += c));
    res.on("end", () => resolve(JSON.parse(body)));
  });
  req.on("error", reject);
});

let targets;
for (let i = 0; i < 60; i++) {
  try { targets = await fetchJson("/json/list"); break; }
  catch { await wait(200); }
}
if (!targets) throw new Error("chrome DevTools did not come up");
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });
let nextId = 0;
const waiting = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && waiting.has(msg.id)) {
    const { resolve, reject } = waiting.get(msg.id);
    waiting.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
};
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  waiting.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});

await call("Page.enable");
await call("Emulation.setDeviceMetricsOverride", { width: 1024, height: 1024, deviceScaleFactor: 1, mobile: false });
await call("Page.navigate", { url: `file://${join(here, "poster.html")}` });
await wait(900);
const probe = await call("Runtime.evaluate", {
  expression: `JSON.stringify({h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth, bad: [...document.querySelectorAll("body *")].filter(e => e.scrollWidth > 1024).slice(0, 5).map(e => e.tagName + "." + e.className)})`,
  returnByValue: true,
});
console.log("layout probe:", probe.result.value);
const shot = await call("Page.captureScreenshot", {
  format: "png", captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 1 },
});
writeFileSync(RAW, Buffer.from(shot.data, "base64"));
ws.close();
chrome.kill();
rmSync(profile, { recursive: true, force: true });
execFileSync("python3", ["-c",
  `from PIL import Image; im = Image.open("${RAW}").convert("RGB"); im.save("${OUT}"); print("entry.png", im.size)`]);
