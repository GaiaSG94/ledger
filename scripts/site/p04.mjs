import { H } from "./h.mjs";
import { F } from "./data.mjs";

/* P4 — The product: a display shelf in axonometry (arrova). Two real screens stand as thin solids,
   the core is one black cube between them. Same grammar as P1–P3: copy left, object right, leaders. */
const SCENE = {
  title: "Ledger — two applications, one core",
  desc: "Ledger's two published applications: Enveloppes (private household) and Mutual aid (public solidarity fund), on the same unmodified core.",
  css: `
.p4 .iso { left: 8%; top: 88%; }
.p4 .display { font-size: 74px; }
.box.ph .ff { display: block; padding: 7px; white-space: normal; background: #0d0d0f; }
.box.ph .ft, .box.ph .fl { background: #1a1a1d; }
.box.ph > i { border-color: #000; }
.pair { list-style: none; margin: 36px 0 0; padding: 0; display: grid; gap: 14px; }
.pair li { display: grid; grid-template-columns: 26px 1fr; gap: 12px; align-items: baseline; font-size: 18px; color: var(--ink-2); }
.pair li b { font: 700 16px/1 var(--f-mono); color: var(--ink); }
.pair li.c b { color: var(--accent); }
.pair .src { display: block; margin-top: 4px; }
.scr { height: 100%; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; font-size: 14px; }
.scr > * { flex-shrink: 0; }
.scr.warm { background: #f7efe1; color: #1e1c17; --a: #8f4f16; --m: #5a5245; --r: #dccfb2; }
.scr.ink { background: #17161a; color: #efe9dc; --a: #d8b26a; --m: #a9a294; --r: rgba(239,233,220,.16); }
.scr .bar { display: flex; justify-content: space-between; align-items: center; padding: 14px 12px 8px; font: 650 17px/1 var(--f-display); letter-spacing: -0.02em; }
.scr .bar span { font: 600 12px/1 var(--f-mono); color: var(--m); }
.scr .tabs { display: flex; gap: 10px; padding: 0 12px 8px; border-bottom: 1px solid var(--r); font: 12px/1.2 var(--f-mono); color: var(--m); white-space: nowrap; overflow: hidden; }
.scr .tabs b { color: var(--a); font-weight: 600; }
.scr .hero-n { margin: 12px 12px 0; padding: 10px; border: 1px solid var(--r); border-radius: 6px; }
.scr .hero-n small { display: block; font: 600 12px/1.3 var(--f-mono); letter-spacing: .04em; text-transform: uppercase; color: var(--a); }
.scr .hero-n strong { display: block; font: 650 18px/1.1 var(--f-mono); margin-top: 6px; }
.scr .rows { padding: 6px 10px 0; }
.scr .rows div { display: flex; justify-content: space-between; gap: 6px; padding: 8px 0; border-bottom: 1px solid var(--r); font: 12px/1.2 var(--f-mono); }
.scr .rows div span:last-child { color: var(--m); }
.scr .btn2 { margin: auto 12px 12px; padding: 11px; text-align: center; border-radius: 8px; background: var(--a); font: 600 13px/1 var(--f-mono); }
.scr.ink .btn2 { color: #17161a; } .scr.warm .btn2 { color: #fbf3e4; }
.cmp td { width: 40%; } .cmp td:first-child { width: 20%; }
.third { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 56px; align-items: end; }
.third .figs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`,
  screen(a) {
    const tabs = a.tabs.slice(0, 2).map((t, i) => (i === 0 ? "<b>" + H.esc(t) + "</b>" : "<span>" + H.esc(t) + "</span>")).join("");
    const rows = a.rows.map((r) => "<div><span>" + H.esc(r[0]) + "</span><span>" + H.esc(r[1]) + "</span></div>").join("");
    return '<div class="scr ' + (a.theme === "warm-paper" ? "warm" : "ink") + '"><div class="bar">' + a.name + "<span>" + a.lang + '</span></div><div class="tabs">' + tabs + "</div>" +
      '<div class="hero-n"><small>' + H.esc(a.big) + "</small><strong>" + H.esc(a.fn) + '</strong></div><div class="rows">' + rows + '</div><div class="btn2">' + H.esc(a.btn) + "</div></div>";
  },
  shelf(D) {
    const [l, r] = D.p4.apps;
    return '<div class="shadow" style="--sx:-20px;--sy:-40px;--sw:700px;--sh:200px"></div>' +
      H.box({ x: -40, y: -60, z: 0, w: 700, d: 190, h: 16, cls: "plinth" }) +
      H.box({ x: 0, y: 60, z: 16, w: 204, d: 14, h: 330, cls: "drop ph", front: SCENE.screen(l), style: "--dl:.3s;" }) +
      H.box({ x: 260, y: 0, z: 16, w: 130, d: 130, h: 130, cls: "drop dark", front: "packages/core", style: "--dl:.6s;" }) +
      H.box({ x: 450, y: 60, z: 16, w: 204, d: 14, h: 330, cls: "drop ph", front: SCENE.screen(r), style: "--dl:.9s;" });
  },
  hero(D) {
    const [l, r] = D.p4.apps;
    return '<section class="hero p4"><div class="wrap">' + H.topline(D) +
      '<div class="split"><div class="copy"><p class="kicker">The product · two screens, one core</p>' +
      '<h1 class="display mt-m" data-k="slogan">Two applications,<br><span class="g">one</span> <em>unmodified</em> <span class="g">core.</span></h1>' +
      '<p class="lede mt-s">' + D.p4.why + "</p>" +
      '<ol class="pair"><li><b>A</b><span>Enveloppes — private, the trust comes from silence.<span class="src" data-num data-src="docs/proofs.json" data-q="envelopes ' + l.gz + '">' + l.gz + " gzip · docs/proofs.json</span></span></li>" +
      '<li class="c"><b>■</b><span>packages/core — the same core, purity.mjs ✓</span></li>' +
      '<li><b>B</b><span>Mutual aid — public, the trust comes from proof.<span class="src" data-num data-src="docs/proofs.json" data-q="mutual-aid ' + r.gz + '">' + r.gz + " gzip · docs/proofs.json</span></span></li></ol></div>" +
      '<figure class="stage" data-k="scene" role="img" aria-label="A display shelf in axonometry: the Enveloppes phone, a black packages/core cube, the Mutual aid phone.">' +
      '<div class="iso pre" aria-hidden="true"><div class="floor" style="--fx:-200px;--fy:-200px;--fw:1200px;--fh:600px"></div>' + SCENE.shelf(D) + "</div>" +
      '<div class="lead v up" style="left:205px;top:110px;--len:30px"><span>A · /envelopes/<small>warm-paper · FR</small></span></div>' +
      '<div class="lead v" style="left:586px;top:350px;--len:40px"><span>B · /mutual-aid/<small>ink-paper · EN</small></span></div>' +
      '<div class="lead v acc" style="left:368px;top:468px;--len:74px"><span>packages/core<small>0 line changed by either app</small></span></div></figure></div>' +
      '<div class="hfoot"><span class="cue">Scroll down</span><p class="legend" data-k="legend">' + D.p4.note + '</p><span class="kicker">04 / 05</span></div></div></section>';
  },
  render(D) {
    const p = D.p4;
    const rows = p.table.map((t) => "<tr><td>" + t[0] + "</td><td>" + H.esc(t[1]) + "</td><td>" + H.esc(t[2]) + "</td></tr>").join("");
    return SCENE.hero(D) +
      '<section class="sec"><div class="wrap"><div class="center"><p class="kicker"><b>§1</b> Why two screens, not one</p><h2 class="h2 mt-s rv">Silence <em>and</em> proof, <span class="g">from the same five extension points.</span></h2></div>' +
      '<table class="tbl cmp mt-l"><thead><tr><th></th><th>apps/envelopes · warm-paper</th><th>apps/mutual-aid · ink-paper</th></tr></thead><tbody>' + rows + "</tbody></table>" + H.src("README.md — “The idea in one page”") + "</div></section>" +
      '<section class="sec"><div class="wrap third"><div><p class="kicker"><b>§2</b> The stranger test · apps/time-bank (unpublished)</p><h2 class="h2 mt-s rv">A third app, <span class="g">by someone who had never opened the repo.</span></h2></div><div class="figs">' + p.third.map((f) => H.fig(f, "rv")).join("") + "</div></div></section>";
  },
};

export default SCENE;
