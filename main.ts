// Round 3 entrypoint: republishes the baked poster image, unchanged.
// Node standard library only. Written fresh in this session.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(here, "poster", "entry.png");
const bytes = readFileSync(src);
const magic = bytes.subarray(0, 8).toString("hex");
if (magic !== "89504e470d0a1a0a") throw new Error("poster/entry.png is not a PNG");
if (bytes.length > 1024 * 1024) throw new Error("poster/entry.png exceeds the 1 MiB cap");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), bytes);
const sha = createHash("sha256").update(bytes).digest("hex");
console.log(`entry.png ${bytes.length} bytes sha256=${sha}`);
