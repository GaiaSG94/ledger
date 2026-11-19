import { H } from "./h.mjs";
import { F } from "./data.mjs";

/* P5 — Proofs: six extruded tiles, slightly tilted, floating around a centred title (LogoPoint);
   the one deviation is the orange tile. Then the full ledger of measurements. */
const SCENE = {
  title: "Ledger — every number has a command",
  desc: "Ledger's measured proofs, guarantees and written limits, each traced to a file of the repository.",
  css: `
.p5 .iso { left: 4%; top: 78%; }
.p5 .display { font-size: 70px; }
.box.pf .ff { flex-direction: column; align-items: flex-start; justify-content: center; gap: 6px; padding: 0 12px; }
.box.pf .ff b { font: 600 26px/1 var(--f-display); letter-spacing: -0.03em; }
.box.pf .ff small { font: 500 12px/1 var(--f-mono); color: var(--ink-3); }
.box.pf.acc .ff small { color: #fff3ea; }
.plist { list-style: none; margin: 32px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px; }
.plist li { display: flex; flex-direction: column; gap: 2px; font-size: 16px; color: var(--ink-2); }
.plist li b { font: 600 22px/1.1 var(--f-display); color: var(--ink); letter-spacing: -0.02em; }
.plist li.a b { color: var(--accent); }
.proof td:nth-child(2) b { font: 600 22px/1.2 var(--f-display); letter-spacing: -0.02em; }
.proof td:nth-child(3) { font: 14px/1.4 var(--f-mono); color: var(--ink-3); }
.contest { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.cbox { border: 1.5px dashed var(--accent); border-radius: 18px; padding: 28px; background: #fff; }
.cvals { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
.cvals div { padding: 12px 14px; border-radius: 12px; display: flex; flex-direction: column; gap: 6px; }
.cvals b { font: 600 28px/1 var(--f-display); letter-spacing: -0.03em; }
.cbox p { margin-top: 16px; color: var(--ink-2); font-size: 17px; }
.gl { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
.gl ul { list-style: none; padding: 0; margin: 24px 0 0; }
.gl li { padding: 18px 0; border-bottom: 1px solid var(--rule); }
.gl li b { font: 600 19px/1.3 var(--f-display); display: block; }
.gl li span { display: block; margin-top: 6px; color: var(--ink-2); font-size: 17px; }
.gl .g b::before { content: "✓ "; }
.gl .l b::before { content: "✕ "; color: var(--accent); }
.unk { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.unk span { font: 15px/1 var(--f-mono); padding: 11px 13px; border: 1px solid var(--rule-2); border-radius: 8px; color: var(--ink-2); background: #fff; }
.unk em { font-style: normal; color: var(--accent); }
`,
  short: ["tests", "acceptance", "proofs", "import", "chain ⚠", "public view"],
  row(D) {
    return '<div class="shadow" style="--sx:0;--sy:10px;--sw:800px;--sh:130px"></div>' + D.p5.hero.map((f, i) =>
      H.box({ x: i * 136, y: 0, z: 0, w: 122, d: 122, h: 150, cls: "drop pf" + (i === 4 ? " acc" : ""), front: "<b>" + H.esc(f.v) + "</b><small>" + SCENE.short[i] + "</small>", style: "--dl:" + (0.2 + i * 0.12).toFixed(2) + "s;" })).join("");
  },
  hero(D) {
    const list = D.p5.hero.map((f, i) => '<li class="' + (i === 4 ? "a" : "") + '" data-num data-src="' + H.esc(f.s) + '" data-q="' + H.esc(f.q || f.v) + '"><b>' + H.esc(f.v) + "</b>" + H.esc(f.n) + H.src(f.s) + "</li>").join("");
    return '<section class="hero p5"><div class="wrap">' + H.topline(D) +
      '<div class="split"><div class="copy"><p class="kicker">Proofs · measured, not claimed</p>' +
      '<h1 class="display mt-m" data-k="slogan">Every number<br><em>has a command.</em><br><s>Not a pitch.</s></h1>' +
      '<ol class="plist">' + list + "</ol></div>" +
      '<figure class="stage" data-k="scene" role="img" aria-label="Six solids in a row, one per measured proof; the chain timing, a documented deviation, is orange.">' +
      '<div class="iso pre" aria-hidden="true"><div class="floor" style="--fx:-160px;--fy:-160px;--fw:1100px;--fh:460px"></div>' + SCENE.row(D) + "</div>" +
      '<div class="lead v acc" style="left:578px;top:332px;--len:110px"><span>⚠ 167 ms<small>target &lt; 150 ms · documented</small></span></div></figure></div>' +
      '<div class="hfoot"><span class="cue">Scroll down</span><p class="legend" data-k="legend">Snapshot of 2026-11-13 · docs/recette.json, docs/proofs.json, README.md — the commands are the authority.</p><span class="kicker">05 / 05</span></div></div></section>';
  },
  render(D) {
    const p = D.p5;
    const rows = p.rows.map((f) => '<tr class="rv"><td>' + H.esc(f.n) + "</td><td><b>" + H.num(f) + "</b></td><td>" + H.esc(f.s) + "</td></tr>").join("");
    const contest = p.contested.map((c) => '<div class="cbox rv"><h3 class="h3">' + c.c + '</h3><div class="cvals">' +
      c.vals.map((v) => '<div class="tile"><b>' + H.num(v) + "</b>" + H.src(v.s) + "</div>").join("") + "</div><p>" + c.note + "</p></div>").join("");
    const li = (arr) => arr.map((g) => "<li><b>" + H.esc(g[0]) + "</b><span>" + H.esc(g[1]) + "</span></li>").join("");
    return SCENE.hero(D) +
      '<section class="sec"><div class="wrap"><p class="kicker"><b>§1</b> The measurements</p><table class="tbl proof mt-m"><thead><tr><th>Claim</th><th>Measured</th><th>Source file</th></tr></thead><tbody>' + rows + "</tbody></table></div></section>" +
      '<section class="sec"><div class="wrap"><div class="center"><p class="kicker"><b>§2</b> Contested in the repository</p><h2 class="h2 mt-s rv">Where the repo <em>disagrees with itself.</em></h2></div><div class="contest mt-l">' + contest + "</div></div></section>" +
      '<section class="sec"><div class="wrap gl"><div class="g"><p class="kicker"><b>§3</b> Guarantees</p><ul>' + li(p.guarantees) + '</ul></div><div class="l"><p class="kicker"><b>§4</b> Written limits</p><ul>' + li(p.limits) + "</ul></div></div></section>" ;
  },
};

export default SCENE;
