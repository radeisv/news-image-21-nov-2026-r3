#!/usr/bin/env node
// Round 3 — Concept A: mirror of the rank-2 entry (kakek-zeus, "Certain Mirror").
// Same 35-story selection as round 2, re-ordered to rank 2's lead order
// (Riyadh 3 downed / COP31 / Peru quake), with a verification chip on every
// story, a HOW WE CHECKED legend, diamond pins on a pale map, and briefs set
// large enough to read at 300px. Written fresh in this session.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "data", "stories35.json"), "utf8"));
const { meta, leads, features, briefs } = data;

const INK = "#1c1a17";
const RED = "#a31d21";
const CREAM = "#f6f1e5";
const PAPER = "#fdfaf1";
const MUTED = "#6b6455";
const NAVY = "#1d2a44";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ---------------------------------------------------------------- art
// Every picture is an original inline SVG drawing, viewBox 320x110, drawn in code.
function skyline(x, y, w, h, win) {
  let out = "";
  const n = 7;
  for (let i = 0; i < n; i++) {
    const bx = x + (i * w) / n;
    const bw = w / n - 4;
    const bh = h * (0.45 + ((i * 37) % 50) / 100);
    out += `<rect x="${bx}" y="${y + h - bh}" width="${bw}" height="${bh}" fill="#0e1526"/>`;
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 2; c++)
        if ((i + r + c) % 2 === 0)
          out += `<rect x="${bx + 3 + c * (bw / 2)}" y="${y + h - bh + 5 + r * 9}" width="4" height="5" fill="${win}"/>`;
  }
  return out;
}

function art(key) {
  switch (key) {
    case "riyadh":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#101a33"/>
        ${skyline(0, 30, 320, 80, "#ffd76a")}
        <path d="M20 78 Q 90 10 150 55" stroke="#ffd76a" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
        <path d="M90 82 Q 170 5 250 48" stroke="#ffd76a" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
        <path d="M180 84 Q 240 20 300 40" stroke="#ffd76a" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
        <g fill="#ffd76a"><circle cx="150" cy="55" r="3.5"/><circle cx="250" cy="48" r="3.5"/><circle cx="300" cy="40" r="3.5"/>
        <path d="M150 44 l2 6 6 1 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -1z"/><path d="M250 37 l2 6 6 1 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -1z"/></g>
        <circle cx="292" cy="16" r="9" fill="#f4ead0"/></svg>`;
    case "cop31":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#dcead9"/>
        <circle cx="70" cy="55" r="38" fill="#7fb3d5"/><path d="M40 45 q18 -14 34 -4 q14 10 4 22 q-16 12 -30 2 q-12 -10 -8 -20z" fill="#5da271"/>
        <circle cx="70" cy="55" r="38" fill="none" stroke="#3d6b8f" stroke-width="2"/>
        <rect x="150" y="14" width="12" height="66" rx="6" fill="#fff" stroke="#a31d21" stroke-width="2"/>
        <rect x="153" y="34" width="6" height="44" fill="#a31d21"/><circle cx="156" cy="82" r="11" fill="#a31d21"/>
        <circle cx="252" cy="52" r="34" fill="#fff" stroke="#1c1a17" stroke-width="2.5"/>
        <line x1="252" y1="52" x2="252" y2="26" stroke="#1c1a17" stroke-width="3"/><line x1="252" y1="52" x2="270" y2="58" stroke="#a31d21" stroke-width="3"/>
        <circle cx="252" cy="52" r="3" fill="#1c1a17"/></svg>`;
    case "quake":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#f2e3cd"/>
        <polyline points="0,52 40,52 58,20 76,84 92,34 108,66 126,52 170,52 188,26 206,78 224,44 240,60 258,52 320,52" fill="none" stroke="#a31d21" stroke-width="3"/>
        <g fill="#8a6d4b"><rect x="30" y="76" width="34" height="20"/><path d="M26 78 L47 62 L68 78z"/><rect x="238" y="74" width="40" height="22"/><path d="M234 76 L258 58 L282 76z"/></g>
        <text x="292" y="34" font-family="Georgia" font-size="30" font-weight="bold" fill="#a31d21" text-anchor="end">6.7</text>
        <text x="292" y="50" font-family="Arial" font-size="10" fill="#6b6455" text-anchor="end">00:09 UTC</text></svg>`;
    case "kyiv":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#f7d54d"/>
        <rect y="55" width="320" height="55" fill="#2f6fb2"/>
        <path d="M0 78 Q160 8 320 78" stroke="#1c1a17" stroke-width="5" fill="none"/>
        <line x1="40" y1="72" x2="40" y2="100" stroke="#1c1a17" stroke-width="3"/><line x1="160" y1="46" x2="160" y2="100" stroke="#1c1a17" stroke-width="3"/><line x1="280" y1="72" x2="280" y2="100" stroke="#1c1a17" stroke-width="3"/>
        <path d="M286 34 l16 26 h-32z" fill="#a31d21"/><text x="286" y="56" font-family="Arial" font-size="16" font-weight="bold" fill="#fff" text-anchor="middle">!</text></svg>`;
    case "hormuz":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#bcd6e2"/>
        <rect y="66" width="320" height="44" fill="#2e6f8e"/>
        <path d="M60 66 L260 66 L240 92 L84 92z" fill="#5b4636"/><rect x="120" y="44" width="80" height="22" fill="#7a5c42"/>
        <g fill="#3a3a3a"><ellipse cx="160" cy="30" rx="26" ry="7"/><rect x="150" y="18" width="20" height="12" rx="4"/><circle cx="138" cy="30" r="5"/><circle cx="182" cy="30" r="5"/></g>
        <path d="M20 100 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/></svg>`;
    case "uranium":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#efe6d2"/>
        <g stroke="#a31d21" stroke-width="2.5" fill="none"><ellipse cx="160" cy="55" rx="70" ry="26"/><ellipse cx="160" cy="55" rx="70" ry="26" transform="rotate(60 160 55)"/><ellipse cx="160" cy="55" rx="70" ry="26" transform="rotate(120 160 55)"/></g>
        <circle cx="160" cy="55" r="14" fill="#1d2a44"/><circle cx="160" cy="55" r="5" fill="#ffd76a"/></svg>`;
    case "aitax":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#1d2a44"/>
        <text x="160" y="86" font-family="Georgia" font-size="72" font-weight="bold" fill="#ffd76a" text-anchor="middle">%</text>
        <rect x="18" y="14" width="52" height="10" fill="#b22234"/><rect x="18" y="24" width="52" height="10" fill="#fff"/><rect x="18" y="14" width="22" height="20" fill="#3c3b6e"/></svg>`;
    case "chinajapan":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#e8e2d2"/>
        <rect x="24" y="22" width="120" height="66" fill="#de2910"/><g fill="#ffde00"><circle cx="52" cy="42" r="8"/><circle cx="86" cy="34" r="4"/><circle cx="98" cy="46" r="4"/><circle cx="92" cy="62" r="4"/><circle cx="74" cy="66" r="4"/></g>
        <rect x="176" y="22" width="120" height="66" fill="#fff" stroke="#999" stroke-width="1"/><circle cx="236" cy="55" r="20" fill="#bc002d"/></svg>`;
    case "davao":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#cfe3ee"/>
        <g fill="#fff"><ellipse cx="70" cy="30" rx="34" ry="12"/><ellipse cx="250" cy="22" rx="40" ry="13"/></g>
        <path d="M40 62 L250 62 L268 72 L250 76 L120 76 L100 92 L86 92 L96 76 L40 76z" fill="#e8e8e8" stroke="#555" stroke-width="1.5"/>
        <path d="M150 62 L176 34 L188 34 L172 62z" fill="#c33"/><circle cx="60" cy="68" r="4" fill="#1d2a44"/></svg>`;
    case "canberra":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#dce8d8"/>
        <rect x="26" y="20" width="120" height="52" rx="10" fill="#1d2a44"/><path d="M60 72 l-8 18 24 -18z" fill="#1d2a44"/>
        <rect x="174" y="34" width="120" height="52" rx="10" fill="#a31d21"/><path d="M260 86 l-8 18 24 -18z" fill="#a31d21"/>
        <circle cx="70" cy="46" r="4" fill="#fff"/><circle cx="92" cy="46" r="4" fill="#fff"/><circle cx="114" cy="46" r="4" fill="#fff"/>
        <circle cx="216" cy="60" r="4" fill="#fff"/><circle cx="238" cy="60" r="4" fill="#fff"/><circle cx="260" cy="60" r="4" fill="#fff"/></svg>`;
    case "bitcoin":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#1d2a44"/>
        <polyline points="20,24 80,34 130,30 190,58 250,52 300,88" fill="none" stroke="#ff5a5a" stroke-width="4"/>
        <circle cx="252" cy="52" r="26" fill="#f7931a"/><text x="252" y="62" font-family="Georgia" font-size="30" font-weight="bold" fill="#fff" text-anchor="middle">₿</text>
        <text x="24" y="100" font-family="Arial" font-size="13" font-weight="bold" fill="#ff8a8a">-3.9%</text></svg>`;
    case "f1":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#20242c"/>
        <path d="M0 84 Q110 30 200 62 T320 44" stroke="#4a4f5a" stroke-width="16" fill="none"/><path d="M0 84 Q110 30 200 62 T320 44" stroke="#ffd76a" stroke-width="2" stroke-dasharray="12 10" fill="none"/>
        <g><rect x="120" y="46" width="86" height="16" rx="7" fill="#c8102e"/><circle cx="140" cy="64" r="9" fill="#111"/><circle cx="188" cy="64" r="9" fill="#111"/><circle cx="140" cy="64" r="3.5" fill="#888"/><circle cx="188" cy="64" r="3.5" fill="#888"/></g>
        <g><rect x="268" y="10" width="34" height="24" fill="#fff"/><g fill="#111"><rect x="268" y="10" width="8.5" height="6"/><rect x="285" y="10" width="8.5" height="6"/><rect x="276.5" y="16" width="8.5" height="6"/><rect x="293.5" y="16" width="8.5" height="6"/><rect x="268" y="22" width="8.5" height="6"/><rect x="285" y="22" width="8.5" height="6"/></g><line x1="270" y1="34" x2="270" y2="52" stroke="#888" stroke-width="2"/></g></svg>`;
    case "cricket":
      return `<svg viewBox="0 0 320 110" preserveAspectRatio="xMidYMid slice"><rect width="320" height="110" fill="#3f7a3a"/>
        <rect x="120" y="18" width="80" height="74" fill="#d9c08a"/>
        <g stroke="#fff" stroke-width="3"><line x1="146" y1="18" x2="146" y2="34"/><line x1="154" y1="18" x2="154" y2="34"/><line x1="162" y1="18" x2="162" y2="34"/><line x1="146" y1="76" x2="146" y2="92"/><line x1="154" y1="76" x2="154" y2="92"/><line x1="162" y1="76" x2="162" y2="92"/></g>
        <rect x="216" y="30" width="10" height="52" rx="4" fill="#8a5a2b" transform="rotate(28 221 56)"/>
        <circle cx="86" cy="76" r="9" fill="#a31d21"/><path d="M80 72 q6 4 12 0" stroke="#fff" stroke-width="1.5" fill="none"/></svg>`;
    default:
      return `<svg viewBox="0 0 320 110"><rect width="320" height="110" fill="#ddd"/></svg>`;
  }
}

// ---------------------------------------------------------------- map
const LAND = [
  // North America
  [[-168,66],[-140,70],[-125,72],[-110,68],[-95,69],[-85,66],[-80,62],[-75,58],[-70,45],[-75,38],[-80,32],[-85,29],[-90,21],[-97,16],[-105,20],[-115,28],[-125,40],[-125,49],[-140,60],[-155,58],[-168,66]],
  // Greenland
  [[-55,60],[-45,60],[-40,65],[-30,68],[-22,70],[-30,74],[-45,76],[-58,74],[-55,60]],
  // South America
  [[-79,9],[-70,11],[-60,8],[-52,5],[-45,-3],[-38,-6],[-40,-20],[-48,-28],[-58,-38],[-65,-45],[-70,-52],[-73,-37],[-72,-20],[-80,-5],[-81,3],[-79,9]],
  // Europe
  [[-10,36],[-9,43],[-2,48],[-5,50],[0,51],[5,53],[8,57],[12,55],[18,56],[21,55],[24,58],[28,60],[30,62],[30,70],[25,71],[18,69],[12,66],[5,60],[-5,58],[-10,54],[-10,43],[-10,36]],
  // Africa
  [[-17,15],[-10,30],[0,36],[10,37],[20,32],[30,31],[35,28],[43,12],[51,11],[48,0],[40,-10],[36,-20],[32,-28],[26,-34],[18,-35],[14,-25],[12,-18],[9,4],[-8,5],[-17,15]],
  // Asia
  [[30,70],[40,68],[55,68],[70,72],[90,75],[110,73],[130,72],[150,70],[170,66],[178,65],[170,60],[162,56],[158,52],[142,45],[140,39],[130,33],[127,35],[122,30],[120,22],[110,20],[105,10],[100,8],[95,15],[90,22],[80,15],[75,20],[70,25],[60,25],[55,26],[50,29],[48,30],[42,28],[35,32],[30,36],[30,70]],
  // SE Asia islands + Australia
  [[95,5],[100,0],[105,-5],[110,-7],[115,-8],[120,-10],[125,-8],[130,-3],[135,0],[140,-5],[145,-10],[150,-20],[150,-30],[145,-38],[140,-38],[135,-35],[130,-32],[125,-33],[118,-35],[113,-25],[110,-20],[105,-15],[100,-5],[95,5]],
];
function project(lon, lat, w, h) {
  return [((lon + 180) / 360) * w, ((90 - lat) / 180) * h];
}
function mapSvg(stories, w, h) {
  const polys = LAND.map((ring) => {
    const pts = ring.map(([lo, la]) => project(lo, la, w, h).map((v) => v.toFixed(1)).join(",")).join(" ");
    return `<polygon points="${pts}" fill="#e7ddc0" stroke="#c9bd9c" stroke-width="0.7"/>`;
  }).join("");
  const grid = [];
  for (let lo = -150; lo <= 150; lo += 30) {
    const [x] = project(lo, 0, w, h);
    grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#c3ccd0" stroke-width="0.5"/>`);
  }
  for (let la = -60; la <= 60; la += 30) {
    const [, y] = project(0, la, w, h);
    grid.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#c3ccd0" stroke-width="0.5"/>`);
  }
  // fan offsets for shared places (Antalya x3, Washington x2 in the full set;
  // here only stories 1-13, so Antalya appears once)
  const pins = stories
    .filter((s) => s.lat != null && !s.space)
    .map((s) => {
      const [x, y] = project(s.lon, s.lat, w, h);
      return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" fill="${RED}" stroke="#fff" stroke-width="1.2"/><text y="3.2" font-family="Arial" font-size="8.5" font-weight="bold" fill="#fff" text-anchor="middle">${s.n}</text></g>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#dde3e6"/>${grid.join("")}${polys}${pins}</svg>`;
}

// ---------------------------------------------------------------- pieces
const chip = (label) =>
  `<span class="chip chip-${label.toLowerCase()}">${esc(label)}</span>`;

const leadCard = (s) => `
  <article class="lead">
    <div class="art">${art(s.art)}</div>
    <div class="banner"><span>${esc(s.banner)}</span><span class="banner2">${esc(s.banner2)}</span></div>
    <div class="kicker">${s.n} · ${esc(s.place)} · ${esc(s.topic)}</div>
    <h2>${esc(s.headline)}</h2>
    <p class="deck">${esc(s.deck)}</p>
    <div class="srcrow"><span class="src">${esc(s.src_note)}</span>${chip(s.chip)}</div>
  </article>`;

const featCard = (s) => `
  <article class="feat">
    <div class="art">${art(s.art)}</div>
    <div class="fbanner">${esc(s.banner)}</div>
    <div class="fkicker">${s.n} · ${esc(s.place)} · ${esc(s.topic)}</div>
    <h3>${esc(s.headline)}</h3>
    <p class="fdeck">${esc(s.deck)}</p>
    <div class="fsrcrow"><span class="src">${esc(s.src_note)}</span>${chip(s.chip)}</div>
  </article>`;

const regionColors = ["#1d4f9c", "#b3541e", "#8a1f2d", "#2e7d4f", "#6a4a8f", "#b8860b", "#555"];
const regionBar = meta.regions
  .map(([name, n], i) => `<span style="background:${regionColors[i]}"><i>●</i> ${esc(name)} · ${n}</span>`)
  .join("");

const briefCols = [briefs.slice(0, 11), briefs.slice(11)];
const briefCol = (items) =>
  `<ol>${items.map((b) => `<li><b>${b.n}</b> <b>${esc(b.place)}:</b> ${esc(b.text)} <span class="bsrc">(${esc(b.source)})</span></li>`).join("")}</ol>`;

// ---------------------------------------------------------------- page
const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1024px;height:1024px;background:${CREAM};color:${INK};font-family:Arial,Helvetica,sans-serif;padding:0 14px}
.topbar{background:${RED};color:#fff;display:flex;justify-content:space-between;align-items:center;height:24px;padding:0 10px;margin:0 -14px}
.topbar .kick{font-weight:800;font-size:11.5px;letter-spacing:2px}
.topbar .corner{font-size:9.5px;letter-spacing:0.4px}
h1{font-family:Georgia,'Times New Roman',serif;font-size:56px;line-height:1.04;text-align:center;padding:4px 0 0}
.strap{text-align:center;font-family:Georgia,serif;font-style:italic;font-size:14.5px;color:#4a4438;padding:2px 0 6px;border-bottom:2px solid ${INK}}
.stats{display:flex;border-bottom:1px solid #b9ad93}
.stats div{flex:1;padding:6px 8px 5px;border-right:1px solid #d8cfb8}
.stats div:last-child{border-right:0}
.stats b{display:block;font-size:25px;color:${RED};line-height:1}
.stats span{font-size:9.5px;line-height:1.25;display:block;margin-top:3px;color:#3d382e}
.regions{display:flex;margin-top:5px}
.regions span{flex:1;color:#fff;font-size:10.5px;font-weight:700;text-align:center;padding:3px 0}
.regions i{font-size:8px;margin-right:3px}
.leads{display:flex;gap:8px;margin-top:6px}
.lead{flex:1;background:${PAPER};border:1px solid #d8cfb8;padding-bottom:5px}
.art svg{display:block;width:100%;height:100%}
.lead .art{height:96px}
.banner{background:${RED};color:#fff;display:flex;justify-content:space-between;gap:8px;padding:3px 8px;font-size:12.5px;font-weight:800;letter-spacing:0.4px}
.banner2{font-weight:700}
.kicker{font-size:10px;font-weight:700;color:${RED};letter-spacing:0.5px;padding:6px 8px 0}
.lead h2{font-family:Georgia,serif;font-size:19px;line-height:1.12;padding:3px 8px 0}
.deck{font-size:11.5px;line-height:1.35;padding:5px 8px 0;color:#2c2822}
.srcrow{display:flex;justify-content:space-between;align-items:center;padding:6px 8px 0}
.src{font-size:9.5px;color:${MUTED}}
.chip{font-size:8.5px;font-weight:800;letter-spacing:0.6px;padding:2px 6px;border-radius:2px;color:#fff;background:#2e7d4f}
.chip-reported{background:#b8860b}
.chip-claim{background:#8a1f2d}
.chip-official{background:#1d4f9c}
.feats{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:7px}
.feat{background:${PAPER};border:1px solid #d8cfb8;padding-bottom:4px}
.feat .art{height:40px}
.fbanner{background:${NAVY};color:#fff;font-size:9.5px;font-weight:800;letter-spacing:0.4px;padding:2.5px 6px}
.fkicker{font-size:8.5px;font-weight:700;color:${RED};padding:3px 6px 0;letter-spacing:0.3px}
.feat h3{font-family:Georgia,serif;font-size:12px;line-height:1.15;padding:2px 6px 0}
.fdeck{font-size:9.5px;line-height:1.28;padding:2px 6px 0;color:#2c2822}
.fsrcrow{display:flex;justify-content:space-between;align-items:center;padding:3px 6px 0}
.fsrcrow .src{font-size:8.5px}
.fsrcrow .chip{font-size:7.5px;padding:1.5px 5px}
.bottom{display:flex;gap:10px;margin-top:7px}
.mapbox{width:360px;flex:none}
.briefbox{flex:1}
.sect{font-size:12.5px;font-weight:800;letter-spacing:0.6px;border-bottom:2px solid ${INK};padding-bottom:3px;margin-bottom:5px}
.briefcols{display:flex;gap:12px}
.briefcols ol{list-style:none;flex:1}
.briefcols li{font-size:9.8px;line-height:1.3;padding:2px 0}
.briefcols li b:first-child{color:${RED}}
.bsrc{color:${MUTED};font-size:9.5px}
.mapnote{font-size:9.5px;color:${MUTED};margin-top:3px}
.datecheck{border:1.6px solid ${RED};margin-top:6px;padding:4px 9px;font-size:10px;line-height:1.35}
.datecheck b{color:${RED};letter-spacing:0.6px}
footer{display:block;text-align:center;font-size:9.5px;color:${MUTED};padding:3px 0 0;line-height:1.4}
</style></head><body>
<div class="topbar"><span class="kick">${esc(meta.kicker)}</span><span class="corner">${esc(meta.corner)}</span></div>
<h1>${esc(meta.title)}</h1>
<div class="strap">${esc(meta.strap)}</div>
<div class="stats">${meta.stats.map(([n, l]) => `<div><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join("")}</div>
<div class="regions">${regionBar}</div>
<div class="leads">${leads.map(leadCard).join("")}</div>
<div class="feats">${features.map(featCard).join("")}</div>
<div class="bottom">
  <div class="mapbox"><div class="sect">WHERE IT HAPPENED</div>${mapSvg([...leads, ...features], 360, 150)}<div class="mapnote">Red diamonds mark stories 1–13, numbered as above.</div></div>
  <div class="briefbox"><div class="sect">ALSO ON SATURDAY 21 NOVEMBER — 22 MORE STORIES</div><div class="briefcols">${briefCol(briefCols[0])}${briefCol(briefCols[1])}</div></div>
</div>
<div class="datecheck"><b>DATE CHECK</b> &nbsp;${esc(meta.datecheck)}</div>
<footer>${esc(meta.footer)}<br>${esc(meta.footer2)}</footer>
</body></html>`;

writeFileSync(join(here, "poster.html"), html);
console.log("poster.html written:", html.length, "bytes");
