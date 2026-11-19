import { H } from "./h.mjs";
import { F } from "./data.mjs";

/* P1 — Understand in 5 seconds: the journal as an axonometric stack of slabs (arrova + dmcg).
   Append-only: slabs only land on top. 0412 stays as a dashed wireframe; 0424, in the accent, reverses it. */
const SCENE = {
  title: "Ledger — nothing is ever edited",
  desc: "Ledger: a double-entry, append-only, hash-chained ledger skeleton. A correction is a reversal.",
  css: `
.p1 .iso { left: 47%; top: 76%; }
.p1 .display { font-size: 70px; }
.law { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.law > div { padding: 36px 32px 32px; }
.law .no { font: 600 72px/0.8 var(--f-display); letter-spacing: -0.06em; }
.law > div:nth-child(2) .no { color: var(--accent); }
.law .h3 { margin-top: 26px; }
.law p { margin-top: 14px; color: var(--ink-2); }
.law code { margin-top: 18px; }
.promise { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.pcard { padding: 40px; display: flex; flex-direction: column; gap: 18px; min-height: 360px; border-radius: 18px; }
.pcard .h2 { font-size: 42px; }
.pcard .fig { margin-top: auto; }
.pcard.win .kicker, .pcard.win .fig .n { color: var(--win-ink-2); }
.pcard.win .fig { border-color: rgba(255,255,255,.25); }
`,
  slabs: [411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424],
  stack() {
    return SCENE.slabs.map((s, i) => {
      const cls = "drop" + (s === 412 ? " ghost" : s === 424 ? " acc" : "");
      const front = s === 412 ? "0412 · cut" : s === 424 ? "0424 ↺ reverses 0412" : "0" + s;
      return H.box({ x: 0, y: 0, z: i * 24, w: 280, d: 190, h: 18, cls: cls, front: front, style: "--dl:" + (0.25 + i * 0.09).toFixed(2) + "s;" });
    }).join("");
  },
  hero(D) {
    return '<section class="hero p1"><div class="wrap">' + H.topline(D) +
      '<div class="split"><div class="copy"><p class="kicker" data-k="kicker">' + D.meta.kicker + "</p>" +
      '<h1 class="display mt-m" data-k="slogan">Nothing is ever edited.<br><span class="g">A correction is a</span> <em>reversal.</em><br><s>Not an edit.</s></h1>' +
      '<p class="lede mt-s">A ledger skeleton you can audit in the browser: every entry sums to zero, the journal only grows, and a mistake is answered by a mirror entry.</p>' +
      '<div class="mt-m" style="display:flex;gap:10px;flex-wrap:wrap"><span class="btn" data-num data-src="' + F.import.s + '" data-q="' + F.import.q + '">Σ = 0 · 12 000 lines · 338 ms</span><span class="tag">↳ ' + F.import.s + "</span></div></div>" +
      '<figure class="stage" data-k="scene" role="img" aria-label="The journal as a stack of slabs, entries 0411 to 0424. Slab 0412 is only a dashed outline: cut, never erased. Slab 0424 on top, in orange, reverses it.">' +
      '<div class="iso pre" aria-hidden="true"><div class="floor"></div><div class="shadow" style="--sx:30px;--sy:30px;--sw:280px;--sh:190px"></div>' + SCENE.stack() + "</div>" +
      '<div class="lead acc r" style="right:351px;top:188px;--len:96px"><span>head · 0424<small>the reversal, linked to 0412</small></span></div>' +
      '<div class="lead r" style="right:343px;top:492px;--len:96px"><span>0412<small>cut — never erased</small></span></div>' +
      '<div class="lead r" style="right:347px;top:330px;--len:96px"><span>Σ postings = 0<small>on every slab</small></span></div></figure></div>' +
      '<div class="hfoot"><span class="cue">Scroll down</span><p class="legend" data-k="legend">Fig. 1 — slabs and numbers are illustrative; the law is packages/core/src/journal.ts and contra.ts.</p><span class="kicker">01 / 05</span></div></div></section>';
  },
  render(D) {
    const p = D.p1;
    const law = p.law.map((l, i) => '<div class="tile rv"><div class="no">0' + (i + 1) + '</div><h3 class="h3">' + l.t + "</h3><p>" + l.d + '</p><code class="tag">' + l.f + "</code></div>").join("");
    const promise = p.promises.map((c) => '<article class="pcard rv ' + (c.paper ? "tile" : "win") + '"><p class="kicker">' + c.k + " · " + c.app + '</p><h3 class="h2">' + c.t + "</h3><p>" + c.d + "</p>" + H.fig(c.fig) + "</article>").join("");
    return SCENE.hero(D) +
      '<section class="sec"><div class="wrap"><div class="center"><p class="kicker"><b>§1</b> The law</p><h2 class="h2 mt-s rv">Three rules. <span class="g">No exception.</span></h2></div><div class="law mt-l">' + law + "</div></div></section>" +
      '<section class="sec sec--tight"><div class="wrap"><p class="kicker"><b>§2</b> Measured, not claimed</p><div class="figs mt-m">' + p.figs.map((f) => H.fig(f, "rv")).join("") + "</div></div></section>" +
      '<section class="sec"><div class="wrap"><div class="center"><p class="kicker"><b>§3</b> One core, two promises</p><h2 class="h2 mt-s rv">Silence on one side. <em>Proof</em> on the other.</h2></div><div class="promise mt-l">' + promise + "</div></div></section>";
  },
};

export default SCENE;
