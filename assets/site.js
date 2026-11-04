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
        // learning outcomes: a flat list, or groups { h, items } (one per part of the course)
        const obj = D.objectives[LANG];
        $('objectives-list').outerHTML = typeof obj[0] === 'string'
            ? `<ul class="objectives" id="objectives-list">${obj.map(o => `<li>${o}</li>`).join('')}</ul>`
            : `<div class="objective-groups" id="objectives-list">${obj.map(g =>
                `<div><h4>${g.h}</h4><ul class="objectives">${g.items.map(o => `<li>${o}</li>`).join('')}</ul></div>`).join('')}</div>`;
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

    // guest lecture: its own section, between the lectures and the assessment
    function renderGuest() {
        const g = (D.guest || {})[LANG], box = $('guest-card'), sec = $('guest');
        if (!g || !box) { if (sec) sec.hidden = true; return; }
        box.innerHTML = `<div class="guest-card"><span class="badge badge-date">${g.date}</span><h3>${esc(g.title)}</h3>`+
            `<p class="guest-name"><strong>${esc(g.name)}</strong></p><p class="guest-role">${esc(g.role)}</p><p class="guest-bio">${g.bio}</p></div>`;
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
    // PART 1: CRYPTO ECONOMICS (Prof. Ilan Alon) AND ASSESSMENT
    // ------------------------------------------------------------
    function renderProject() {
        $('seminar-intro').innerHTML = T.seminarIntro;
        const cols = [T.colSession, T.colTopic, T.colPrep, T.colVideo, T.colProj].slice(0, D.seminars[LANG][0].length);
        $('seminar-table').innerHTML = `<table class="sessions"><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>` +
            D.seminars[LANG].map(([d, ...rest]) => `<tr><td class="c"><strong>${d}</strong></td>${rest.map(x => `<td>${x}</td>`).join('')}</tr>`).join('') + '</table>';
        const pc = (D.projectCategories || {})[LANG], box = $('project-categories');
        if (pc && box) box.innerHTML = `<h3>${pc.h}</h3><p class="section-intro">${pc.intro}</p><div class="table-wrap"><table class="sessions"><tr>${pc.cols.map(c => `<th>${c}</th>`).join('')}</tr>` +
            pc.rows.map(([c, k, f]) => `<tr><td><strong>${c}</strong></td><td>${k}</td><td>${f}</td></tr>`).join('') + '</table></div>';
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
        const instr = `<div class="info-card"><h3>${T.instructor}</h3><p><strong>${c.name}</strong></p>` +
            c[LANG].map(p => `<p>${p}</p>`).join('') +
            `<p style="margin-top:0.6rem"><a href="mailto:${c.email}">${c.email}</a></p>` +
            `<p style="margin-top:0.8rem"><a class="btn btn-primary" href="https://danpele.github.io/${LANG === 'ro' ? 'index_ro.html' : ''}" target="_blank" rel="noopener">${LANG === 'ro' ? 'Site-ul personal' : 'Personal website'}</a></p></div>`;
        const sem = c.seminar ? `<div class="info-card"><h3>${T.seminarCard}</h3><p><strong>${c.seminar.name}</strong></p><p>${T.seminarRole}</p>` + (c.seminar.email ? `<p style="margin-top:0.6rem"><a href="mailto:${c.seminar.email}">${c.seminar.email}</a></p>` : '') + `</div>` : '';
        // Part 1 (Crypto Economics) first, then Part 2 (Blockchain Analytics and the exam)
        $('contact-cards').innerHTML = sem + instr + `<div class="info-card"><h3>${T.office}</h3><p>${T.officeText}</p></div>`;
        $('footer-logos').innerHTML = D.footerLogos.map(([href, src, alt]) =>
            `<a href="${href}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}"></a>`
        ).join('');
        $('footer-text').innerHTML = `&copy; 2026 ${T.footer}`;
        document.querySelector('.hero-inner').insertAdjacentHTML('afterbegin', `<figure class="motto"><blockquote lang="it">“Tristo è quel discepolo che non avanza il suo maestro.”</blockquote>` +
            `<p>${LANG === 'ro' ? 'Trist este discipolul care nu își depășește maestrul.' : 'Poor is the pupil who does not surpass his master.'}</p><figcaption>— Leonardo da Vinci</figcaption></figure>`);
    }

    // ------------------------------------------------------------
    // PRACTICE QUIZZES (no sign-in, no stored score)
    // Bank format (assets/quizzes/<lecture id>.js):
    //   MFM_DATA.quizzes['l3'] = { draw: 15, questions: [
    //     { correct: <index 0-3>, en: {title, text, options:[4], correctExplanation, incorrectExplanation} } ] }
    // The questions are in English on both pages, like the lectures.
    // ------------------------------------------------------------
    const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
    let quiz = null;   // { items: [{ q, order, correctPos }], answers: {} }
    const QL = q => q[LANG] || q.en;

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function renderQuizTabs() {
        $('quiz-tabs').innerHTML = D.chapters.map(ch => {
            const has = !!D.quizzes[ch.id];
            return `<button class="btn btn-outline${has ? '' : ' unavailable'}" data-ch="${ch.id}" title="${esc(ch.title[LANG])}">L${ch.num}</button>`;
        }).join('');
        $('quiz-tabs').querySelectorAll('button').forEach(b => {
            b.onclick = () => showQuiz(b.getAttribute('data-ch'));
        });
    }

    function showQuiz(id) {
        $('quiz-tabs').querySelectorAll('button').forEach(b =>
            b.classList.toggle('active', b.getAttribute('data-ch') === id));
        const ch = D.chapters.find(c => c.id === id);
        const bank = D.quizzes[id];
        const box = $('quiz-container');
        const heading = `<h3>${T.chapter} ${ch.num}: ${ch.title[LANG]}</h3>`;
        if (!bank) {
            quiz = null;
            box.innerHTML = `${heading}<p class="quiz-intro">${T.quizSoon}</p>`;
            return;
        }
        box.innerHTML = `${heading}
            <p class="quiz-intro">${T.quizIntro}</p>
            <div id="quiz-questions"></div>
            <div class="quiz-actions">
                <button class="btn btn-primary" id="quiz-score">${T.calc}</button>
                <button class="btn btn-outline" id="quiz-reset">${T.reset}</button>
            </div>
            <p class="score-display" id="quiz-score-display" aria-live="polite"></p>
            <div id="quiz-answer-key"></div>`;
        $('quiz-score').onclick = calculateScore;
        $('quiz-reset').onclick = () => showQuiz(id);
        newAttempt(bank);
    }

    function newAttempt(bank) {
        const n = Math.min(bank.draw || 15, bank.questions.length);
        const items = shuffle(bank.questions).slice(0, n).map(q => {
            const order = shuffle(QL(q).options.map((_, i) => i));   // order[pos] = original option index
            return { q, order, correctPos: order.indexOf(q.correct) };
        });
        quiz = { items, answers: {} };
        $('quiz-questions').innerHTML = items.map((it, k) => {
            const L = QL(it.q);
            return `<div class="quiz-question" id="qq${k}">
                <h4>${T.question} ${k + 1}: ${L.title}</h4>
                <p>${L.text}</p>
                <ul class="quiz-options" role="radiogroup">
                    ${it.order.map((orig, pos) =>
                        `<li tabindex="0" role="radio" aria-checked="false" data-k="${k}" data-pos="${pos}">
                            <input type="radio" name="qq${k}" tabindex="-1"> ${LETTERS[pos]}) ${L.options[orig]}</li>`).join('')}
                </ul>
                <div class="answer-reveal answer-correct" id="qq${k}-ok"><strong>${T.correct}</strong> ${L.correctExplanation}</div>
                <div class="answer-reveal answer-incorrect" id="qq${k}-ko"><strong>${T.incorrect}</strong>
                    ${T.correctIs} ${LETTERS[it.correctPos]}) ${L.options[it.q.correct]}. ${L.incorrectExplanation}</div>
            </div>`;
        }).join('');
        $('quiz-questions').querySelectorAll('.quiz-options li').forEach(li => {
            const pick = () => answer(parseInt(li.dataset.k, 10), parseInt(li.dataset.pos, 10));
            li.onclick = pick;
            li.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } };
        });
        typeset($('quiz-container'));
    }

    function answer(k, pos) {
        if (!quiz || quiz.answers[k] !== undefined) return;   // locked after the first answer
        quiz.answers[k] = pos;
        $('qq' + k).querySelectorAll('.quiz-options li').forEach(li => {
            const mine = parseInt(li.dataset.pos, 10) === pos;
            li.classList.add('locked');
            li.classList.toggle('chosen', mine);
            li.setAttribute('aria-checked', mine ? 'true' : 'false');
            li.querySelector('input').checked = mine;
        });
        const ok = pos === quiz.items[k].correctPos;
        $('qq' + k + '-ok').style.display = ok ? 'block' : 'none';
        $('qq' + k + '-ko').style.display = ok ? 'none' : 'block';
    }

    function calculateScore() {
        if (!quiz) return;
        const total = quiz.items.length;
        let score = 0, answered = 0;
        quiz.items.forEach((it, k) => {
            if (quiz.answers[k] !== undefined) {
                answered++;
                if (quiz.answers[k] === it.correctPos) score++;
            }
        });
        const pct = Math.round((score / total) * 100);
        let msg = `${T.score}: ${score}/${total} (${pct}%)`;
        if (answered < total) msg += ` - ${total - answered} ${T.unanswered}`;
        msg += ' - ' + T.verdicts[pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0];
        $('quiz-score-display').textContent = msg;
        const rows = quiz.items.map((it, k) => {
            const L = QL(it.q);
            const a = quiz.answers[k];
            const cls = a === undefined ? '' : (a === it.correctPos ? 'ok' : 'ko');
            const res = a === undefined ? '-' : (a === it.correctPos ? '<span class="res-ok">OK</span>' : '<span class="res-ko">X</span>');
            const yours = a === undefined ? '-' : `${LETTERS[a]}) ${L.options[it.order[a]]}`;
            return `<tr class="${cls}"><td class="c"><strong>${k + 1}</strong></td><td>${L.text}</td>
                <td>${LETTERS[it.correctPos]}) ${L.options[it.q.correct]}</td><td>${yours}</td><td class="c">${res}</td></tr>`;
        }).join('');
        $('quiz-answer-key').innerHTML = `<div class="answer-key"><h4>${T.detailed}</h4><table>
            <tr><th class="c">${T.colQ}</th><th>${T.colQuestion}</th><th>${T.colCorrect}</th><th>${T.colYours}</th><th class="c">${T.colResult}</th></tr>
            ${rows}</table></div>`;
        typeset($('quiz-answer-key'));
    }

    // the quiz section and its menu link appear only once a lecture has a quiz bank
    function initQuizzes() {
        const any = D.chapters.some(ch => D.quizzes && D.quizzes[ch.id]);
        const sec = $('quizzes'), link = document.querySelector('nav a[href="#quizzes"]');
        if (sec) sec.hidden = !any;
        if (link) link.parentElement.hidden = !any;
        if (!any) return;
        renderQuizTabs();
        const first = D.chapters.find(ch => D.quizzes[ch.id]);
        showQuiz(first.id);
    }

    // ------------------------------------------------------------
    // INIT
    // ------------------------------------------------------------
    function init() {
        renderStatic();
        renderOverview();
        initLightbox();
        renderChapters();
        renderGuest();
        renderProject();
        renderResources();
        renderContact();
        initQuizzes();
        typeset();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
