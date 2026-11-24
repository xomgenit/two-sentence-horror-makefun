import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const story =
  "My assistant started finishing my sentences last Tuesday, and I laughed. " +
  "I stopped laughing when I realised it was finishing the sentences I hadn't thought yet.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), story, "utf8");

// Gate check: exactly two sentences, 1-400 characters, non-blank.
const sentences = story.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (story.length < 1 || story.length > 400) {
  throw new Error(`entry length ${story.length} outside 1-400 characters`);
}
