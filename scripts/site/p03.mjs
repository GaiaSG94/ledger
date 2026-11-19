import { H } from "./h.mjs";
import { F } from "./data.mjs";

/* P3 — The pipeline: ten solids rising in axonometry, one per real step; black solids hold the law,
   the orange one is the reversal. The terminal sits in a product window. */
const SCENE = {
  title: "Ledger — ten steps, no magic",
  desc: "Ledger's real pipeline: from a messy CSV to a published, verifiable proof page, in ten named steps.",
  css: `
.p3 .iso { left: 12%; top: 80%; }
.p3 .display { font-size: 80px; }
.legend10 { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 28px; }
.legend10 li { display: flex; gap: 10px; align-items: baseline; font: 500 16px/1.3 var(--f-mono); color: var(--ink-2); }
.legend10 li b { color: var(--ink); min-width: 22px; }
.legend10 li.k b { color: var(--ink); text-decoration: underline 2px; text-underline-offset: 4px; }
.legend10 li.a b { color: var(--accent); }
.steps-wrap { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; }
.steps { list-style: none; margin: 0; padding: 0; }
.step { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 18px; padding: 26px 0; border-bottom: 1px solid var(--rule); }
.step .no { font: 600 32px/1 var(--f-display); letter-spacing: -0.05em; }
.step code { display: block; font: 14px/1.4 var(--f-mono); color: var(--ink-3); margin-top: 6px; overflow-wrap: anywhere; }
.step p { margin-top: 10px; color: var(--ink-2); }
.term { position: sticky; top: 72px; }
.term pre { margin: 0; padding: 18px 16px 22px; font: 14px/1.75 var(--f-mono); white-space: pre-wrap; overflow-wrap: anywhere; color: var(--win-ink-2); }
.term .c { color: #8f8e89; }
.term .a, .term .w { color: var(--win-acc); }
.term .w::after { content: "  ⚠ target < 150 ms — deviation documented"; color: #8f8e89; }
.guards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
.guard { padding: 26px 22px; }
.guard code { font: 15px/1.3 var(--f-mono); overflow-wrap: anywhere; font-weight: 700; }
.guard p { margin-top: 10px; color: var(--ink-2); font-size: 17px; }
`,
  law: { "05": "k", "07": "k", "09": "k", "06": "a" },
  stairs(D) {
    return D.p3.steps.map((s, i) => {
      const k = SCENE.law[s.n];
      const cls = "drop" + (k === "k" ? " dark" : k === "a" ? " acc" : "");
      return H.box({ x: i * 54, y: 0, z: 0, w: 48, d: 120, h: 24 + i * 22, cls: cls, front: s.n, style: "--dl:" + (0.2 + i * 0.08).toFixed(2) + "s;" });
    }).join("");
  },
  hero(D) {
    const lg = D.p3.steps.map((s) => '<li class="' + (SCENE.law[s.n] || "") + '"><b>' + s.n + "</b>" + s.t + "</li>").join("");
    return '<section class="hero p3"><div class="wrap">' + H.topline(D) +
      '<div class="split"><div class="copy"><h1 class="display" data-k="slogan">Ten steps,<br><span class="g">no magic.</span></h1>' +
      '<p class="lede mt-s">From a messy bank CSV to a published proof page. Each solid is one step and one file; each links to the previous by its hash.</p>' +
      '<ol class="legend10">' + lg + "</ol></div>" +
      '<figure class="stage" data-k="scene" role="img" aria-label="Ten solids rising from left to right, one per step. Steps 05, 07 and 09 are black, step 06 the reversal is orange.">' +
      '<div class="iso pre" aria-hidden="true"><div class="floor" style="--fx:-160px;--fy:-160px;--fw:900px;--fh:520px"></div><div class="shadow" style="--sx:10px;--sy:20px;--sw:540px;--sh:120px"></div>' + SCENE.stairs(D) + "</div>" +
      '<div class="lead v" style="left:150px;top:540px;--len:30px"><span>01 · Compose<small>defineLedger(…)</small></span></div>' +
      '<div class="lead r" style="right:171px;top:110px;--len:40px"><span>10 · Assemble the proof<small>/proof.html ← docs/proofs.json</small></span></div></figure></div>' +
      '<div class="hfoot"><span class="cue">Scroll down</span><p class="legend" data-k="legend">Black solids hold the law: post (Σ = 0), chain, publish irreversibly. Orange: correct by reversal.</p><span class="kicker">03 / 05</span></div></div></section>';
  },
  render(D) {
    const p = D.p3;
    const steps = p.steps.map((s) => '<li class="step rv" data-step><span class="no">' + s.n + '</span><div><h3 class="h3" data-name>' + s.t + "</h3><code data-file>" + H.esc(s.f) + "</code><p>" + H.esc(s.d) + "</p></div></li>").join("");
    const term = p.terminal.map((l) => (l.s ? '<span class="' + (l.c || "") + '" data-num data-src="' + l.s + '" data-q="' + H.esc(l.t) + '">' : '<span class="' + (l.c || "") + '">') + H.esc(l.t) + "</span>").join("\n");
    const guards = p.guards.map((g) => '<div class="guard tile rv"><code>' + g.f + "</code><p>" + H.esc(g.d) + "</p></div>").join("");
    return SCENE.hero(D) +
      '<section class="sec"><div class="wrap"><p class="kicker"><b>§1</b> The pipeline, as built</p><div class="steps-wrap mt-m"><ol class="steps">' + steps + "</ol>" +
      '<aside class="term win rv" aria-label="Terminal output copied from docs/proofs.json and docs/recette.json"><div class="win-h"><i></i><i></i><i></i><span>pnpm proof · 2026-11-13</span></div><pre>' + term + "</pre></aside></div></div></section>" +
      '<section class="sec"><div class="wrap"><div class="center"><p class="kicker"><b>§2</b> Guards that fail the build</p><h2 class="h2 mt-s rv">The skeleton <span class="g">defends itself.</span></h2></div><div class="guards mt-l">' + guards + "</div></div></section>";
  },
};

export default SCENE;
