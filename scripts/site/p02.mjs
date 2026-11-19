import { H } from "./h.mjs";
import { F } from "./data.mjs";

/* P2 — The problem, embodied: an axonometric heap of loose statement sheets, a dashed fold on the floor,
   and one solid block — the one figure. Then the fund, where a removed name leaves a ghost. */
const SCENE = {
  title: "Ledger — can I still spend tomorrow?",
  desc: "The problem Ledger solves: a household drowning in statements, a solidarity fund that must prove where the money went.",
  css: `
.p2 .iso { left: 14%; top: 56%; }
.p2 .display { font-size: 78px; }
.p2-who { font: 500 16px/1.4 var(--f-mono); color: var(--ink-2); }
.sheet-r { position: absolute; transform-style: preserve-3d; left: 0; top: 0; transform: translate(var(--tx), var(--ty)) rotateZ(var(--rz)); }
.fold-l { position: absolute; left: 140px; top: 140px; width: 70px; height: 0; border-top: 2px dashed var(--ink); transform: rotateZ(45deg); transform-origin: left; }
.fold-l::after { content: ""; position: absolute; right: -2px; top: -7px; border: 6px solid transparent; border-left: 10px solid var(--ink); border-right: 0; }
.fold-t { position: absolute; left: 330px; top: 318px; font: 500 15px/1 var(--f-mono); }
.box.one .ff { font-size: 15px; font-weight: 700; }
.fund { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 56px; align-items: start; }
.fund .figs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.fund .fig b { font-size: 38px; white-space: nowrap; }
.crow { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) 80px auto; gap: 14px; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,.08); font: 16px/1.2 var(--f-mono); }
.ghost-n { position: relative; display: inline-block; width: 100%; height: 18px; border: 1px dashed var(--win-acc); border-radius: 2px; }
.ghost-n::after { content: "name removed"; position: absolute; left: 8px; top: 2px; font: 500 12px/12px var(--f-mono); letter-spacing: .06em; color: var(--win-acc); text-transform: uppercase; }
.crow .p { color: var(--win-ink-2); font-size: 15px; }
.chain-f { padding: 16px 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.receipt { font: 600 17px/1 var(--f-mono); color: var(--win-acc); }
.chain-f .tag { background: transparent; border-color: var(--win-acc); color: var(--win-acc); }
.cost td:nth-child(2) { color: var(--ink-3); text-decoration: line-through; text-decoration-color: rgba(14,14,14,.35); }
.cost td:nth-child(3)::before { content: "✓ "; color: var(--accent); }
`,
  heap() {
    const rz = [-8, 6, -14, 3, 11, -5, 17, -11, 8, -2, 13, -16, 5, -7, 9, -3, 15, -9, 2, 7];
    return rz.map((r, i) => '<div class="sheet-r" style="--tx:' + ((i * 29) % 37 - 18) + "px;--ty:" + ((i * 41) % 31 - 15) + "px;--rz:" + r + 'deg">' +
      H.box({ x: 0, y: 0, z: i * 7, w: 170, d: 120, h: 3, cls: "drop", style: "--dl:" + (0.15 + i * 0.05).toFixed(2) + "s;" }) + "</div>").join("");
  },
  hero(D) {
    const p = D.p2;
    return '<section class="hero p2"><div class="wrap">' + H.topline(D) +
      '<div class="split"><div class="copy"><p class="p2-who" data-num data-src="' + p.whoSrc.s + '" data-q="' + p.whoSrc.q + '">' + H.esc(p.who) + "</p>" +
      '<h1 class="display mt-m" data-k="slogan">Can I still spend <em>tomorrow?</em></h1>' +
      '<p class="lede mt-s">' + H.esc(p.pain) + "</p>" +
      '<p class="lede mt-m">Ledger folds the journal into <b>one figure</b>, on the phone, never stored.</p></div>' +
      '<figure class="stage" data-k="scene" role="img" aria-label="A heap of loose statement sheets on the left; a dashed fold line on the floor; one solid block on the right: Reste à dépenser aujourd\'hui.">' +
      '<div class="iso pre" aria-hidden="true"><div class="floor" style="--fx:-200px;--fy:-200px;--fw:900px;--fh:900px"></div>' +
      '<div class="shadow" style="--sx:20px;--sy:20px;--sw:180px;--sh:130px"></div><div class="shadow" style="--sx:215px;--sy:215px;--sw:140px;--sh:140px"></div>' +
      SCENE.heap() + '<div class="fold-l"></div>' +
      H.box({ x: 200, y: 200, z: 0, w: 140, d: 140, h: 120, cls: "drop one", front: "one figure", style: "--dl:1.4s;" }) + "</div>" +
      '<div class="lead v" style="left:222px;top:394px" data-num data-src="' + p.before.s + '" data-q="' + H.esc(p.before.q) + '"><span><b>3 000 lines</b><small>statements · video-script.md</small></span></div>' +
      '<div class="lead v acc" style="left:520px;top:404px;--len:64px" data-num data-src="' + p.after.s + '" data-q="' + H.esc(p.after.q) + '"><span><b>' + H.esc(p.after.label) + '</b><small>one figure · ui/src/i18n.ts</small></span></div>' +
      '<span class="fold-t">fold</span></figure></div>' +
      '<div class="hfoot"><span class="cue">Scroll down</span><p class="legend" data-k="legend">Fig. 2 — sheets are a texture, not the data. The figure is the household’s own and is not shown here.</p><span class="kicker">02 / 05</span></div></div></section>';
  },
  render(D) {
    const f = D.p2.fund;
    const rows = f.rows.map((r) => '<div class="crow rv">' + (r.ghost ? '<span class="ghost-n" role="img" aria-label="a name was removed here"></span>' : "<span>" + r.p + "</span>") +
      '<span class="p">' + (r.ghost ? r.p : "account") + '</span><span class="m">' + r.m + "</span><span>" + r.a + "</span></div>").join("");
    const cost = D.p2.cost.map((c) => "<tr><td>" + c.d + "</td><td>" + H.esc(c.b) + "</td><td>" + H.esc(c.a) + "</td></tr>").join("");
    return SCENE.hero(D) +
      '<section class="sec"><div class="wrap fund"><div><p class="kicker"><b>§1</b> The solidarity fund · apps/mutual-aid</p><h2 class="h2 mt-s rv">' + f.q[0] + " <em>" + f.q[1] + '</em></h2><p class="lede mt-m">' + f.d + '</p><div class="figs mt-l">' + f.figs.map((x) => H.fig(x, "rv")).join("") + "</div></div>" +
      '<div class="win rv"><div class="win-h"><i></i><i></i><i></i><span>/mutual-aid/ · public chain, redacted</span></div>' + rows +
      '<div class="chain-f"><span class="receipt">{entryId, hash}</span><span class="tag">✓ verified — offline, no account</span></div></div></div>' +
      '<div class="wrap"><p class="small mt-m">' + f.rowsNote + "</p></div></section>" +
      '<section class="sec"><div class="wrap"><div class="center"><p class="kicker"><b>§2</b> Before / after</p><h2 class="h2 mt-s rv">The pain, <span class="g">line by line.</span></h2></div><table class="tbl cost mt-l"><thead><tr><th>Question</th><th>Before</th><th>With Ledger</th></tr></thead><tbody>' + cost + "</tbody></table></div></section>";
  },
};

export default SCENE;
