/** The Ledger product site (design V5, locked 2026-11-19): two static pages, nothing else.
 *
 *   `/`           — four chapters in one scroll: understand, the problem, the pipeline, the product;
 *   `/proof.html` — the proofs, generated from docs/proofs.json so it cannot drift.
 *
 * Everything is rendered here at build time. The browser only runs a small reveal runtime, honours
 * prefers-reduced-motion, and makes no request: styles and script are inline, no font, no image.
 * Every figure carries `data-src` + `data-q`; `traceFigures` refuses the build when one of them is no
 * longer found, word for word, in the repository file it claims to come from.
 */
import { readFileSync, existsSync } from "node:fs";
import { DATA, SRC, F } from "./data.mjs";
import { H } from "./h.mjs";
import p01 from "./p01.mjs";
import p02 from "./p02.mjs";
import p03 from "./p03.mjs";
import p04 from "./p04.mjs";
import p05 from "./p05.mjs";

const read = (name) => readFileSync(new URL(name, import.meta.url), "utf8");
const CSS = read("./theme.css") + "\n" + read("./base.css") + "\n" + read("./narrow.css");

const CHAPTERS = [
  { id: "understand", nav: "Understand", scene: p01 },
  { id: "problem", nav: "The problem", scene: p02 },
  { id: "pipeline", nav: "Pipeline", scene: p03 },
  { id: "product", nav: "Product", scene: p04 },
];

/** The only script of the site: reveal on scroll, let the solids land, show the rail. */
const RUNTIME = `document.documentElement.classList.add("js");
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isos = [...document.querySelectorAll(".iso.pre")];
  const items = [...document.querySelectorAll(".rv")];
  if (reduced || !("IntersectionObserver" in window)) {
    isos.forEach((el) => el.classList.remove("pre"));
    items.forEach((el) => el.classList.add("is-in"));
  } else {
    /* a solid is a 1-pixel origin once rotated: watch the figure that holds it, not the origin */
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const iso = e.target.querySelector(".iso.pre");
      if (iso) iso.classList.remove("pre");
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }), { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    isos.forEach((el) => io.observe(el.closest("figure") || el.parentElement));
    items.forEach((el) => io.observe(el));
  }
  const rail = document.getElementById("rail");
  if (!rail) return;
  const on = () => rail.classList.toggle("is-on", scrollY > innerHeight * 0.7);
  addEventListener("scroll", on, { passive: true });
  on();
})();`;

function rail(links, current) {
  const dots = links.map((l, i) => `<a href="${l.href}"${l.id === current ? ' aria-current="page"' : ""}>${String(i + 1).padStart(2, "0")} ${l.nav}</a>`).join("");
  return `<nav class="rail" id="rail" aria-label="Chapters"><a href="./">Σ0 ${DATA.meta.brand}</a><div class="dots">${dots}</div><span class="meta">${DATA.meta.hackathon} · ${DATA.meta.track}</span></nav>`;
}

function shell({ title, desc, css, body, nav, current, tab }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${H.esc(desc)}">
<meta name="color-scheme" content="light">
<style>
${CSS}
${css}
</style></head>
<body><a class="skip" href="#app">Skip to content</a>
${rail(nav, current)}
<a class="vtab" href="${tab.href}">${tab.label}</a>
<main id="app">
${body}
</main>
<script>${RUNTIME}</script>
</body></html>
`;
}

function footer(apps) {
  const cards = apps.map((a) => `<a class="app-card tile" href="./${a.slug}/"><span class="kicker">/${a.slug}/</span><b>${H.esc(a.title)}</b><span>${H.esc(a.what)}</span><span class="go">Open →</span></a>`).join("");
  const srcs = [...new Set(Object.values(SRC))].map((s) => `<span>${s}</span>`).join("");
  return `<section class="sec" id="apps"><div class="wrap"><p class="kicker"><b>Open</b> the three published applications</p>
<div class="apps mt-m">${cards}</div></div></section>
<footer class="foot"><div class="wrap"><p class="kicker"><b>Sources</b> — every figure on this site is read from one of these files, and the build fails if one drifts</p>
<div class="srcs mt-m">${srcs}</div>
<div class="next"><a href="./proof.html">Next — <em>Proofs</em> →</a><span class="kicker">MIT</span></div>
<p class="small mt-m">No account, no server, no network request after loading. Kiroween 2026 · Skeleton Crew.</p></div></footer>`;
}

const NAV = [...CHAPTERS.map((c) => ({ id: c.id, nav: c.nav, href: `./#${c.id}` })), { id: "proofs", nav: "Proofs", href: "./proof.html" }];

/** `/`: the four chapters, then the three applications. */
export function indexPage(apps) {
  const body = CHAPTERS.map((c) => `<div class="chapter" id="${c.id}">${c.scene.render(DATA)}</div>`).join("\n") + footer(apps);
  return shell({
    title: "Ledger — nothing is ever edited", desc: p01.desc, css: CHAPTERS.map((c) => c.scene.css).join("\n"),
    body, nav: NAV, current: "understand", tab: { href: "./proof.html", label: "Proof ↗" },
  });
}

/** `/proof.html`: the proofs chapter, with the live table of docs/proofs.json under it. */
export function proofPage(proofs) {
  const passed = proofs.filter((p) => p.passed).length;
  F.proofs.v = `${passed} / ${proofs.length}`;
  F.proofs.q = `"passed": ${passed}`;
  const rows = proofs.map((p) => `<tr><td>${p.passed ? "✓ PASS" : "✕ FAIL"}</td><td><code>${H.esc(p.id)}</code></td><td>${H.esc(p.detail)}</td></tr>`).join("");
  const table = `<section class="sec"><div class="wrap"><p class="kicker"><b>§6</b> What is verified — Proofs, ${passed}/${proofs.length} at the last build</p>
<table class="tbl mt-m"><thead><tr><th>State</th><th>Proof</th><th>Detail</th></tr></thead><tbody>${rows}</tbody></table>
<p class="small mt-m">Generated from docs/proofs.json by scripts/assemble-site.mjs — each line is produced by a script, not by hand. <a href="./">← back</a></p></div></section>`;
  return shell({
    title: "Proofs — Ledger", desc: p05.desc, css: p05.css, body: `<div class="chapter" id="proofs">${p05.render(DATA)}</div>${table}`,
    nav: NAV, current: "proofs", tab: { href: "./", label: "Start ↺" },
  });
}

const norm = (s) => s.replace(/[\s  ]+/g, " ");
const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/** Every `data-src`/`data-q` pair of a page must be found word for word in that repository file. */
export function traceFigures(html) {
  const pairs = [...html.matchAll(/data-src="([^"]+)" data-q="([^"]*)"/g)].map((m) => ({ s: unescape(m[1]), q: unescape(m[2]) }));
  const cache = new Map();
  const drift = pairs.filter(({ s, q }) => {
    if (!cache.has(s)) cache.set(s, existsSync(s) ? norm(readFileSync(s, "utf8")) : null);
    const text = cache.get(s);
    return text === null || !text.includes(norm(q));
  }).map(({ s, q }) => `${s} does not contain "${q}"`);
  return { total: pairs.length, drift };
}
