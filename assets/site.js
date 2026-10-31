// ============================================================
// Blockchain Applications course website - rendering (same layout as the MFM site)
// Reads window.MFM_DATA (course-data.js). Page language from window.MFM_LANG ('en' | 'ro'); the lectures are in English.
// Lectures are referenced by their stable `id`; `num` is only the display order.
// ============================================================
(function () {
    'use strict';

    const LANG = window.MFM_LANG === 'ro' ? 'ro' : 'en';
    const D = window.MFM_DATA;
    const T = D.ui[LANG];
    const $ = id => document.getElementById(id);

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    function typeset(el) {
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise(el ? [el] : undefined).then(() => fitMath()).catch(() => {});
        }
    }

    // shrink display formulas that are wider than their box, so no sideways scrolling is needed
    function fitMath(root) {
        (root || document).querySelectorAll('.cf-tex, .formula-tex').forEach(box => {
            const m = box.querySelector('mjx-container');
            if (!m || !box.clientWidth) return;
            m.style.fontSize = '';
            const w = m.scrollWidth, avail = box.clientWidth - 4;
            if (w > avail) m.style.fontSize = Math.max(55, Math.floor(100 * avail / w)) + '%';
        });
    }
    let fitTimer;
    window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(() => fitMath(), 150); });
    document.addEventListener('toggle', e => {
        if (e.target.classList && e.target.classList.contains('chapter-formulas') && e.target.open) fitMath(e.target);
    }, true);

    // on the narrow chapter cards, put the parts of a two-part formula on separate lines
    const stackTex = tex => /\\qquad/.test(tex) && !/\\begin\{/.test(tex)
        ? '$$\\begin{gathered}' + tex.slice(2, -2).replace(/,?\s*\\qquad\s*/g, () => ' \\\\ ') + '\\end{gathered}$$'
        : tex;

    // ------------------------------------------------------------
    // STATIC TEXT (header, nav, section titles)
    // ------------------------------------------------------------
    function renderStatic() {
        document.title = T.pageTitle;
        document.documentElement.lang = LANG;
        document.querySelectorAll('[data-t]').forEach(el => {
            const path = el.getAttribute('data-t').split('.');
            let v = T;
            for (const p of path) v = v && v[p];
            if (typeof v === 'string') el.innerHTML = v;
        });
    }

    // ------------------------------------------------------------
    // OVERVIEW, OBJECTIVES, FORMULAS
    // ------------------------------------------------------------
    function renderOverview() {
        $('overview-cards').innerHTML = D.overview[LANG].map(c =>
            `<div class="info-card"><h3>${c.h}</h3>${c.p.map(p => `<p>${p}</p>`).join('')}</div>`
        ).join('');
        $('objectives-list').innerHTML = D.objectives[LANG].map(o => `<li>${o}</li>`).join('');
    }

    // ------------------------------------------------------------
    // LIGHTBOX (chapter charts)
    // ------------------------------------------------------------
    function openLightbox(src, caption) {
        $('lightbox-img').src = src;
        $('lightbox-img').alt = caption;
        $('lightbox-cap').textContent = caption;
        $('lightbox').hidden = false;
        document.body.classList.add('no-scroll');
        $('lightbox-close').focus();
    }

    function initLightbox() {
        const box = $('lightbox');
        const close = () => { box.hidden = true; document.body.classList.remove('no-scroll'); };
        $('lightbox-close').setAttribute('aria-label', T.close);
        $('lightbox-close').onclick = close;
        box.onclick = e => { if (e.target === box) close(); };
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) close(); });
    }

    // ------------------------------------------------------------
    // CHAPTER CARDS
    // ------------------------------------------------------------
    const LINK_CLASS = { slides: 'btn-primary', lectureNb: 'btn-outline', quantlets: 'btn-outline', interactive: 'btn-outline', web: 'btn-outline' };
    const PLACEHOLDER_LINKS = ['slides', 'lectureNb'];

    function linkButton(l) {
        const external = /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : '';
        // local PDFs open in the bundled PDF.js viewer: its history makes the in-slide "Back" buttons work in every browser
        const href = (!/^https?:/.test(l.href) && /\.pdf$/i.test(l.href)) ? `pdfjs/web/viewer.html?file=${encodeURIComponent('../../' + l.href + '?t=' + Math.floor(Date.now() / 600000))}` : l.href;
        const main = `<a href="${href}" class="btn ${LINK_CLASS[l.type]}"${external}>${T.links[l.type]}</a>`;
        if (!l.colab) return main;
        return `<span class="link-group">${main}<a href="${l.colab}" class="btn btn-colab" target="_blank" rel="noopener" title="${T.links.colab}">Colab</a></span>`;
    }

    // web lecture (web/lN.html) and interactive page (interactive/lN.html), after the slides, once a lecture has them
    function withInteractive(ch) {
        const links = ch.links[LANG] || ch.links.en, s = links.find(l => l.type === 'slides');
        if (!s) return links;
        const i = links.indexOf(s), extra = [];
        if (ch.web) extra.push({ type: 'web', href: `web/l${ch.num}.html` });
        if (ch.interactive) extra.push({ type: 'interactive', href: `interactive/l${ch.num}.html` });
        return [...links.slice(0, i + 1), ...extra, ...links.slice(i + 1)];
    }

    // lecture buttons in two labelled rows: lecture (slides, web page, interactive), code
    const LINK_ROWS = [['course', ['slides', 'web', 'interactive']], ['code', ['lectureNb', 'quantlets']]];

    function linkRows(links) {
        return LINK_ROWS.map(([row, types]) => {
            const ls = types.flatMap(t => links.filter(l => l.type === t));
            return ls.length ? `<div class="link-row"><span class="link-row-h">${T.linkRows[row]}</span><div class="link-row-b">${ls.map(linkButton).join('')}</div></div>` : '';
        }).join('');
    }

    function renderChapters() {
        $('chapters-grid').innerHTML = D.chapters.map(ch => {
            const badge = (ch.available ? '' : `<span class="badge badge-soon">${T.comingSoon}</span>`) +
                (ch.date ? `<span class="badge badge-date">${ch.date[LANG] || ch.date}</span>` : '');
            const links = ch.available
                ? linkRows(withInteractive(ch))
                : PLACEHOLDER_LINKS.map(t => `<span class="btn disabled" aria-disabled="true">${T.links[t]}</span>`).join('');
            const qn = (ch.quantinar || []).length
                ? `<div class="quantinar-box"><h4><img src="logos/qr_logo.png" alt="">${T.quantinar}</h4><ul>` +
                  ch.quantinar.map(c => `<li><a href="${c.url}" target="_blank" rel="noopener">${esc(c.title)}</a></li>`).join('') +
                  '</ul></div>'
                : '';
            const chart = (D.chapterCharts || {})[ch.id];
            const fig = chart
                ? `<button type="button" class="chapter-chart" data-src="${chart.src}" data-cap="${esc(chart[LANG])}" title="${esc(chart[LANG])}">
                       <img src="${chart.src}" alt="${esc(chart[LANG])}" loading="lazy"></button>`
                : '';
            const fs = (D.formulas || []).filter(f => f.ch === ch.id);
            const formulas = fs.length
                ? `<details class="chapter-formulas"><summary>${T.formulas} (${fs.length})</summary>` +
                  fs.map(f => `<div class="cf"><h5>${f[LANG]}</h5><div class="cf-tex">${stackTex(f.tex)}</div></div>`).join('') +
                  '</details>'
                : '';
            return `<div class="chapter-card${ch.available ? '' : ' soon'}" id="chapter-${ch.id}">
                <div class="chapter-header"><h3>${T.chapter} ${ch.num}: ${ch.title[LANG]}</h3><div class="badges">${badge}</div></div>
                ${fig}
                <div class="chapter-body">
                    <ul>${ch.topics[LANG].map(t => `<li>${t}</li>`).join('')}</ul>
                    ${formulas}
                    <div class="chapter-links">${links}</div>
                    ${qn}
                </div>
            </div>`;
        }).join('');
        $('chapters-grid').querySelectorAll('.chapter-chart').forEach(b => {
            b.onclick = () => openLightbox(b.dataset.src, b.dataset.cap);
        });
    }

    // ------------------------------------------------------------
    // SEMINARS (Prof. Ilan Alon) AND ASSESSMENT
    // ------------------------------------------------------------
    function renderProject() {
        $('seminar-intro').innerHTML = T.seminarIntro;
        $('seminar-table').innerHTML = `<table class="sessions"><tr><th>${T.colSession}</th><th>${T.colTopic}</th><th>${T.colPrep}</th></tr>` +
            D.seminars[LANG].map(([s, t, p]) => `<tr><td class="c"><strong>${s}</strong></td><td>${t}</td><td>${p}</td></tr>`).join('') + '</table>';
        $('project-cards').innerHTML = D.assessment[LANG].map(c =>
            `<div class="info-card"><h3>${c.h}</h3>${c.p.map(p => `<p>${p}</p>`).join('')}</div>`
        ).join('');
    }

    // ------------------------------------------------------------
    // RESOURCES, CONTACT, FOOTER
    // ------------------------------------------------------------
    function renderResources() {
        $('resources-list').innerHTML = D.resources.map(r =>
            `<a href="${r.href}" class="resource-item" target="_blank" rel="noopener">
                ${r.img ? `<img class="resource-logo" src="${r.img}" alt="">` : `<div class="resource-icon">${r.icon}</div>`}
                <div><strong>${r[LANG][0]}</strong><p>${r[LANG][1]}</p></div>
            </a>`
        ).join('');
        $('data-sources').innerHTML = D.dataSources.map(s =>
            `<li><a href="${s.href}" target="_blank" rel="noopener"><strong>${s.name}</strong></a> - ${s[LANG]}</li>`
        ).join('');
        $('bibliography').innerHTML = D.bibliography.map(b => `<li>${b}</li>`).join('');
    }

    function renderContact() {
        const c = D.contact;
        $('contact-cards').innerHTML =
            `<div class="info-card"><h3>${T.instructor}</h3><p><strong>${c.name}</strong></p>` +
            c[LANG].map(p => `<p>${p}</p>`).join('') +
            `<p style="margin-top:0.6rem"><a href="mailto:${c.email}">${c.email}</a></p></div>` +
            (c.seminar ? `<div class="info-card"><h3>${T.seminarCard}</h3><p><strong>${c.seminar.name}</strong></p><p>${T.seminarRole}</p>` + (c.seminar.email ? `<p style="margin-top:0.6rem"><a href="mailto:${c.seminar.email}">${c.seminar.email}</a></p>` : '') + `</div>` : '') +
            `<div class="info-card"><h3>${T.office}</h3><p>${T.officeText}</p></div>`;
        $('footer-logos').innerHTML = D.footerLogos.map(([href, src, alt]) =>
            `<a href="${href}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}"></a>`
        ).join('');
        $('footer-text').innerHTML = `&copy; 2026 ${T.footer}`;
    }

    // ------------------------------------------------------------
    // INIT
    // ------------------------------------------------------------
    function init() {
        renderStatic();
        renderOverview();
        initLightbox();
        renderChapters();
        renderProject();
        renderResources();
        renderContact();
        typeset();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
