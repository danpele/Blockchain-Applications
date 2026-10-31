// Web version of a lecture (web/lN.html): table of contents state, wide inline formulas (adapted from the MFM course pages).
(function () {
'use strict';
const toc = document.getElementById('wtoc');
if (toc && window.innerWidth < 1000) toc.open = false;
// inline formulas wider than their line get their own horizontal scroll instead of widening the page
function fitMath() {
  document.querySelectorAll('.fbody mjx-container:not([display]), .ctext mjx-container:not([display])').forEach(m => {
    m.classList.remove('wide');
    const box = m.closest('li, p, td, th, .col, .col1, .bk-b, .fbody, .ctext');
    if (box && m.getBoundingClientRect().width > box.clientWidth - 4) m.classList.add('wide');
  });
}
window.addEventListener('web-mathjax', fitMath);
let rt = null;
window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fitMath, 200); });
// highlight the current section in the table of contents
const links = [...document.querySelectorAll('.wtoc a')], heads = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && heads.length) {
  const io = new IntersectionObserver(() => {
    let cur = null;
    for (const h of heads) if (h.getBoundingClientRect().top < 140) cur = h;
    links.forEach(a => a.classList.toggle('on', !!cur && a.getAttribute('href') === '#' + cur.id));
  }, { rootMargin: '0px 0px -60% 0px' });
  heads.forEach(h => io.observe(h));
}
})();
