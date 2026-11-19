#!/usr/bin/env node
/** Builds the root page and the proof page into dist/, next to the three applications.
 *  The pages themselves (design V5) live in scripts/site/; this file only lists the applications
 *  and refuses the build when a figure no longer matches its source file. */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { indexPage, proofPage, traceFigures } from "./site/page.mjs";

const SITES = [
  { slug: "skeleton", title: "Skeleton", what: "An empty ledger that runs: one chart, one rule, one report." },
  { slug: "envelopes", title: "Household envelopes", what: "Everything private. One number: can I still spend tomorrow?" },
  { slug: "mutual-aid", title: "Mutual aid fund", what: "Everything public. A hash chain a donor can verify without any tool." },
];

let proofs = [];
try { proofs = JSON.parse(readFileSync("docs/proofs.json", "utf8")).proofs ?? []; } catch { proofs = []; }

const pages = [["dist/index.html", indexPage(SITES)], ["dist/proof.html", proofPage(proofs)]];
const drift = [];
let figures = 0;
for (const [, html] of pages) {
  const trace = traceFigures(html);
  figures += trace.total;
  drift.push(...trace.drift);
}
if (drift.length > 0) {
  console.error(`assemble-site: ${drift.length} figure(s) drifted from their source:\n  ${drift.join("\n  ")}`);
  process.exit(1);
}
mkdirSync("dist", { recursive: true });
for (const [file, html] of pages) writeFileSync(file, html);
console.log(`site assembled: index + ${proofs.length} proofs · ${figures} figures traced to their source`);
