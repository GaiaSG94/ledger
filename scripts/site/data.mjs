/* Ledger product site (design V5, locked 2026-11-19). Every figure on the site comes from here. Each one names its repository file (s) and
   the exact string (q, defaults to v) that verify.mjs must find in that file of Tradoooo/ledger.
   Not in this object → not on the site; assemble-site.mjs fails the build when one drifts. */
export const SRC = {
  readme: "README.md",
  recette: "docs/recette.json",
  proofsJson: "docs/proofs.json",
  proofsMd: "docs/PROOFS.md",
  features: "docs/FEATURES.md",
  unknown: "docs/UNKNOWN-ROOM.md",
  video: "docs/video-script.md",
  kiro: "KIRO_JOURNAL.md",
  view: "packages/core/src/view.ts",
  hash: "packages/core/src/hash.ts",
  i18n: "packages/ui/src/i18n.ts",
};

export const F = {
  import: { v: "338 ms", n: "12 000 entries imported · 0 rejected", s: SRC.recette, q: "338 ms · 12000 entries · 0 rejected" },
  balance: { v: "5 815 396 = 5 815 396", n: "trial balance, debit = credit, 3 accounts", s: SRC.recette, q: "5815396 = 5815396 (3 accounts)" },
  chain: { v: "167 ms", n: "12 000 links verified — target < 150 ms, deviation documented", s: SRC.recette, q: "167 ms · 12000 links · ok" },
  tamper: { v: "seq 4287", n: "a tampered record is named at its index: FAILED, reason bad-hash", s: SRC.recette, q: "FAILED at seq 4287, reason bad-hash" },
  network: { v: "0", n: "foreign request over 4 pages", s: SRC.recette, q: "0 foreign request(s) over 4 pages" },
  a11y: { v: "0 · 0", n: "critical · serious accessibility violations (WCAG 2.0/2.1 AA)", s: SRC.recette, q: "0 critical, 0 serious" },
  publicGz: { v: "16 566 B", n: "public view, gzip · 0 private marker · 0 private id", s: SRC.recette, q: "16566 B gzip" },
  publicN: { v: "214", n: "published entries of the solidarity fund", s: SRC.recette, q: "214 entries" },
  acceptance: { v: "12 / 12", n: "acceptance checks · 2 documented deviations", s: SRC.proofsJson, q: "12/12 checks passed (2 documented deviation(s))" },
  proofs: { v: "10 / 10", n: "proofs re-run by pnpm proof", s: SRC.proofsJson, q: "\"passed\": 10" },
  tests: { v: "138", n: "tests in 11 files · 95 in the 8 core files", s: SRC.readme, q: "**138** in 11 files" },
  budget: { v: "2 492 / 3 200", n: "lines, skeleton total — the ceiling never moves", s: SRC.proofsJson, q: "2492/3200" },
  bundles: { v: "102.7 · 113.5 · 110.5 kB", n: "gzip: skeleton · envelopes · mutual-aid (ceiling 220)", s: SRC.proofsJson, q: "skeleton 102.7 kB · envelopes 113.5 kB · mutual-aid 110.5 kB" },
  stranger: { v: "16 min 32 s", n: "a third app (time bank) by someone who had never opened the repo", s: SRC.unknown, q: "16 min 32 s" },
  strangerLoc: { v: "542 lines", n: "time-bank, ceiling 600 · 0 line changed under packages/**", s: SRC.unknown, q: "542 non-empty lines" },
  phone: { v: "16 / 16", n: "views fit in 390 px — overflow debt repaid", s: SRC.proofsMd, q: "**16/16**" },
  seeds: { v: "20 × 200", n: "seeds × runs per property, all green", s: SRC.proofsMd, q: "20 seeds × 200 runs" },
  deps: { v: "1", n: "runtime dependency (zod) + React — no chart, csv, date or state library", s: SRC.readme, q: "Dependencies at runtime: **1** (`zod`)" },
  lines3000: { v: "3 000", n: "lines of bank statements", s: SRC.video, q: "Three thousand lines of bank statements" },
  lines12k: { v: "12 000", n: "imported bank lines · 6 envelopes", s: SRC.readme, q: "12 000 imported bank lines, 6 envelopes" },
  fragment: { v: "2 000", n: "characters max for a public link (URL fragment)", s: SRC.view, q: "MAX_FRAGMENT = 2000" },
};

export const DATA = {
  meta: {
    brand: "Ledger",
    hackathon: "Kiroween 2026",
    track: "Skeleton Crew",
    slogan: "Nothing is ever edited: a correction is a reversal.",
    kicker: "Double-entry · append-only · hash-chained",
    repo: "github.com/Tradoooo/ledger",
    license: "MIT",
    planches: [
      { n: "01", slug: "comprendre", nav: "Understand", file: "01-comprendre.html" },
      { n: "02", slug: "probleme", nav: "The problem", file: "02-probleme.html" },
      { n: "03", slug: "pipeline", nav: "Pipeline", file: "03-pipeline.html" },
      { n: "04", slug: "produit", nav: "Product", file: "04-produit.html" },
      { n: "05", slug: "preuves", nav: "Proofs", file: "05-preuves.html" },
    ],
  },

  p1: {
    /* illustrative sheet: the mechanism, not real data — said in the legend */
    sheet: [
      { seq: "0409", h: "9c1e04", m: "Salary", a: "+2 140.00" },
      { seq: "0410", h: "41ab7f", m: "Rent", a: "−780.00" },
      { seq: "0411", h: "e07d22", m: "Groceries", a: "−64.20" },
      { seq: "0412", h: "b3f290", m: "Electricity", a: "−640.00", cut: true },
      { seq: "0413", h: "5d9031", m: "Pharmacy", a: "−18.90" },
      { seq: "0414", h: "77c4e8", m: "↺ reverses 0412", a: "+640.00", contra: true },
      { seq: "0415", h: "a26e5b", m: "Electricity", a: "−64.00" },
    ],
    legend: "Fig. 1 — the mechanism. Entries, amounts and hashes on this sheet are illustrative; the law is packages/core/src/journal.ts and contra.ts.",
    law: [
      { t: "Every entry sums to zero.", d: "An entry whose postings do not cancel is refused with a typed UnbalancedEntry that names the exact gap.", f: "journal.ts" },
      { t: "No record is ever edited.", d: "The journal is frozen. A mistake is answered by a mirror entry linked to the original; both lines stay visible.", f: "contra.ts" },
      { t: "Every balance is a fold.", d: "Balances are recomputed from the journal, never stored. A snapshot replays to the same balances and the same head.", f: "reports.ts" },
    ],
    figs: [F.import, F.chain, F.network, F.proofs],
    promises: [
      { k: "Private", app: "apps/envelopes", t: "Everything stays on the phone.", d: "A household imports years of statements and gets one number. Nothing leaves the page.", fig: F.network, paper: true },
      { k: "Public", app: "apps/mutual-aid", t: "Everything is published — redacted.", d: "A solidarity fund publishes a rebuilt chain, and anyone checks a receipt offline.", fig: F.publicGz },
    ],
  },

  p2: {
    who: "Sarah · a household · Thursday, 26 November, 6:40 a.m.",
    whoSrc: { s: SRC.video, q: "Thursday, 26 November" },
    question: ["Can I still spend", "tomorrow?"],
    pain: "Three thousand lines of statements, and no tool answers without a server, an account and a spreadsheet.",
    before: F.lines3000,
    after: { label: "Reste à dépenser aujourd'hui", fn: "leftTodayMinor(journal, today)", n: "one figure — the household's own, recomputed on the phone, never stored", s: SRC.i18n, q: "Reste à dépenser aujourd'hui" },
    fund: {
      q: ["Where did the", "money go?"],
      d: "The same core, the opposite promise. Beneficiaries become case numbers, dates collapse to the month, free text is dropped — amounts stay exact. The ghost of a removed name stays visible in the chain: you can see that a name is missing, never which one.",
      rows: [
        { p: "party-3f9a1c2b", m: "2026-03", a: "120.00", ghost: true },
        { p: "party-77b0e4d1", m: "2026-03", a: "45.00", ghost: true },
        { p: "Donations", m: "2026-03", a: "+300.00" },
        { p: "party-0ac9f5e8", m: "2026-02", a: "80.00", ghost: true },
      ],
      rowsNote: "Illustrative rows. Rule: packages/core/src/view.ts — redaction is irreversible (ADR 0003).",
      figs: [F.publicN, F.publicGz, F.fragment],
    },
    cost: [
      { d: "Where the data goes", b: "a spreadsheet, a screenshot, a guess", a: "nowhere — 0 foreign request" },
      { d: "What a correction does", b: "overwrites the cell; the error disappears", a: "a linked reversal; both lines stay visible" },
      { d: "What a donor can check", b: "a PDF and a promise", a: "{entryId, hash} against the chain, offline" },
      { d: "What it costs to trust", b: "an account and a server", a: "1 runtime dependency + React, no account" },
    ],
  },

  p3: {
    steps: [
      { n: "01", t: "Compose", f: "defineLedger({chart, rules, envelopes, reports, presentation})", d: "Five extension points, composed and frozen. The application decides; the core holds the law." },
      { n: "02", t: "Detect", f: "packages/core/src/csv.ts", d: "Encoding, separator, decimal mark and date format are shown and confirmed before a single row lands." },
      { n: "03", t: "Import, fingerprinted", f: "csv.ts · ImportWizard", d: "Importing the same statement twice adds nothing: duplicates are counted, not merged." },
      { n: "04", t: "Learn a rule", f: "packages/core/src/rules.ts", d: "A memo pattern proposes an account. Splits are conservative: the remainder stays on the first leg." },
      { n: "05", t: "Post, balanced", f: "packages/core/src/journal.ts", d: "Σ postings = 0, or a typed UnbalancedEntry naming the exact gap. Then the record is frozen." },
      { n: "06", t: "Correct by reversal", f: "packages/core/src/contra.ts", d: "A mirror entry linked to the original. The original hash does not change; the pair stays visible." },
      { n: "07", t: "Chain & verify", f: "packages/core/src/hash.ts", d: "prevHash + SHA-256 over canonical JSON, prefix ledger:v1. verifyChain names the first faulty index: bad-seq, broken-link, bad-hash." },
      { n: "08", t: "Fold", f: "packages/core/src/reports.ts", d: "Balances are folds. leftTodayMinor answers the household's one question." },
      { n: "09", t: "Publish, irreversibly", f: "packages/core/src/view.ts", d: "The chain is rebuilt from zero: parties pseudonymised, dates collapsed to the month, free text dropped. The link lives in the fragment, ≤ 2 000 characters." },
      { n: "10", t: "Assemble the proof", f: "packages/ui · scripts/assemble-site.mjs", d: "/proof.html is generated from docs/proofs.json, so the published page cannot drift from the repository." },
    ],
    guards: [
      { f: "scripts/lint.mjs", d: "no Date.now, new Date, Math.random or fetch in the core" },
      { f: ".github/checks/purity.mjs", d: "no application concept inside packages/**" },
      { f: ".github/checks/loc-budget.mjs", d: "3 200 lines for the skeleton, 600 per app; fix = remove code" },
      { f: ".github/checks/fixture-privacy.mjs", d: "no IBAN, no valid card number: fictional fixtures only" },
    ],
    /* every terminal line is copied from a repository file and checked by verify.mjs */
    terminal: [
      { t: "$ pnpm proof   # docs/proofs.json · 2026-11-13", c: "c" },
      { t: "ok   purity: no application concept in packages/**", s: SRC.proofsJson },
      { t: "ok   fixture privacy: fictional data only", s: SRC.proofsJson },
      { t: "ok   skeleton total   2492/3200", s: SRC.proofsJson },
      { t: "ok   lint: 70 files, no forbidden pattern", s: SRC.proofsJson },
      { t: ".kiro tracked, MIT licence present", s: SRC.proofsJson },
      { t: "skeleton 102.7 kB · envelopes 113.5 kB · mutual-aid 110.5 kB", s: SRC.proofsJson },
      { t: "12/12 checks passed (2 documented deviation(s))", s: SRC.proofsJson, c: "a" },
      { t: "$ cat docs/recette.json", c: "c" },
      { t: "338 ms · 12000 entries · 0 rejected", s: SRC.recette, c: "a" },
      { t: "5815396 = 5815396 (3 accounts)", s: SRC.recette, c: "a" },
      { t: "167 ms · 12000 links · ok", s: SRC.recette, c: "w" },
      { t: "FAILED at seq 4287, reason bad-hash", s: SRC.recette, c: "a" },
      { t: "0 foreign request(s) over 4 pages", s: SRC.recette, c: "a" },
    ],
  },

  p4: {
    apps: [
      { id: "envelopes", theme: "warm-paper", lang: "FR", name: "Enveloppes", path: "/envelopes/", tabs: ["Vue d'ensemble", "Journal", "Import", "…"], big: "Reste à dépenser aujourd'hui", fn: "leftTodayMinor", chips: ["séparateur ;", "décimale ,", "Windows-1252"], rows: [["Courses", "enveloppe"], ["Logement", "enveloppe"], ["Énergie", "enveloppe"]], btn: "Importer un relevé", trust: "Everything private — the trust comes from silence.", gz: "113.5 kB" },
      { id: "mutual-aid", theme: "ink-paper", lang: "EN", name: "Mutual aid", path: "/mutual-aid/", tabs: ["Publish", "Verify a receipt", "Audit", "…"], big: "Public journal", fn: "214 entries", chips: ["{entryId, hash}", "offline"], rows: [["party-3f9a1c2b", "2026-03"], ["party-77b0e4d1", "2026-03"], ["party-0ac9f5e8", "2026-02"]], btn: "Verify", trust: "Everything public — the trust comes from proof.", gz: "110.5 kB" },
    ],
    note: "Screen reconstructions — tab names, labels and figures come from docs/FEATURES.md, README.md and docs/recette.json; the layout is this page's, not the application's. Envelope rows and pseudonyms are illustrative.",
    why: "Skeleton Crew asks for versatility. One screen cannot prove it; two applications at opposite ends of the privacy spectrum, on the same unmodified core, can.",
    table: [
      ["Who", "a household, on a phone", "a solidarity fund: donors and aid"],
      ["Trust model", "everything private — silence", "everything public — proof"],
      ["Data", "12 000 imported lines, 6 envelopes", "214 entries, plain-language notes"],
      ["Question", "“can I still spend tomorrow?”", "“where did the money go?”"],
      ["Share", "nothing leaves the browser", "a redacted page + {entryId, hash}"],
    ],
    third: [F.stranger, F.strangerLoc],
  },

  p5: {
    hero: [F.tests, F.acceptance, F.proofs, F.import, F.chain, F.publicGz],
    rows: [F.balance, F.tamper, F.network, F.a11y, F.budget, F.bundles, F.stranger, F.phone, F.seeds, F.deps],
    contested: [
      { c: "Import of 12 000 lines — one run, three values", vals: [
        { v: "227 ms", s: SRC.video, q: "two hundred and twenty-seven milliseconds" },
        { v: "338 ms", s: SRC.recette, q: "338 ms" },
        { v: "383 ms", s: SRC.readme, q: "**383 ms**" },
      ], note: "This site shows docs/recette.json everywhere else; the other two files are stale." },
      { c: "Proofs re-run — README vs JSON", vals: [
        { v: "8 / 8", s: SRC.readme, q: "**8/8**" },
        { v: "10 / 10", s: SRC.proofsJson, q: "\"total\": 10" },
      ], note: "The JSON is the newer file and feeds /proof.html; the README line is stale." },
    ],
    guarantees: [
      ["No clock, no randomness, no network in the core.", "scripts/lint.mjs"],
      ["No application concept in packages/**.", ".github/checks/purity.mjs"],
      ["The ceiling never moves; the only fix is removing code.", "ADR 0002 · loc-budget.mjs"],
      ["Redaction is irreversible: no key recovers an identity.", "ADR 0003 · view.ts"],
      ["Fixtures are fictional, seed 20261103, byte for byte.", "fixture-privacy.mjs"],
    ],
    limits: [
      ["It does not prove an entry is sincere.", "The chain proves coherence, not truth: a donation that never happened, once booked, is confirmed forever."],
      ["It does not prove the tail was not cut.", "Whoever holds the file can publish a shorter head; the mitigation (head printed in the annual report) is written on the public page."],
      ["Automated ≠ manual.", "The published version is tested automatically; the manual test remains to be done. Factur-X is not in this edition."],
    ],
  },
};
