/* Server-side HTML helpers of the Ledger site. The page is static: figures, scenes and text are
   rendered at build time; the browser only runs the reveal/drop runtime in page.mjs. */

export const H = {
  esc: (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])),
  src: (s) => '<span class="src">' + H.esc(s) + "</span>",
  /* a traced figure: verify.mjs reads data-src and searches data-q in that repository file */
  fig: (f, cls) =>
    '<div class="fig' + (cls ? " " + cls : "") + '" data-num data-src="' + H.esc(f.s) + '" data-q="' + H.esc(f.q || f.v) + '">' +
    "<b>" + H.esc(f.v) + "</b>" + (f.n ? '<span class="n">' + H.esc(f.n) + "</span>" : "") + H.src(f.s) + "</div>",
  /* an inline traced value, for tables */
  num: (f) => '<span data-num data-src="' + H.esc(f.s) + '" data-q="' + H.esc(f.q || f.v) + '">' + H.esc(f.v) + "</span>",
  brand: (D) =>
    '<a class="brand" href="./" data-k="brand"><span class="glyph" aria-hidden="true">Σ0</span>' + H.esc(D.meta.brand) + "</a>",
  badge: (D) => '<span class="badge" data-k="badge">' + H.esc(D.meta.hackathon) + " · <b>" + H.esc(D.meta.track) + "</b></span>",
  topline: (D) => '<header class="topline">' + H.brand(D) + H.badge(D) + "</header>",
  /* a true CSS 3D cuboid for the axonometric scenes (arrova): top, front and left faces with hairline edges.
     o = {x, y, z, w, d, h, cls, top, front, style} — lengths in px on the floor plane of an .iso container */
  box: (o) =>
    '<div class="box' + (o.cls ? " " + o.cls : "") + '" style="--x:' + o.x + "px;--y:" + o.y + "px;--z:" + (o.z || 0) + "px;--w:" + o.w + "px;--d:" + o.d + "px;--h:" + o.h + "px;" + (o.style || "") + '">' +
    '<i class="ft">' + (o.top || "") + '</i><i class="ff">' + (o.front || "") + '</i><i class="fl"></i></div>',
};
