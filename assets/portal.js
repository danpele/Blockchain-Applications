// ============================================================
// Blockchain Applications: Google sign-in, attendance, online exam and instructor panel.
// Backend: Google Apps Script web app (assets/config.js, BACKEND_URL). The backend verifies every
// Google token and takes name and e-mail from it; the exam key never reaches the browser.
// Used by index.html / index_ro.html (attendance + instructor panel) and exam.html (exam).
// ============================================================
(function () {
    'use strict';
    const CFG = window.BA_CONFIG || {};
    const LANG = window.MFM_LANG || 'en';
    const configured = v => !!v && !/^YOUR_/.test(v);
    const ENABLED = configured(CFG.GOOGLE_CLIENT_ID) && configured(CFG.BACKEND_URL);
    const ALLOWED = ['ase.ro', 'stud.ase.ro'];
    const DEV = !!window.BA_DEV && /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

    const TXT = {
        en: {
            title: 'Attendance and Exam',
            intro: 'Attendance: scan the QR code shown on the screen with your phone and sign in with your ASE Google account (@stud.ase.ro). Your attendance is then recorded.',
            scan: 'Scan the QR code shown on the screen to record your attendance.', signinQr: 'Sign in with your ASE account to record your attendance.',
            examLink: 'Open the exam page', examNote: 'Final exam: Friday 27 November 2026, on this website.',
            signin: 'Sign in with your ASE account to continue.', signedAs: 'Signed in as', logout: 'Sign out',
            wrongDomain: 'Please use your ASE account (@stud.ase.ro or @ase.ro).',
            code: 'Code shown on the screen', send: 'Record my attendance', sending: 'Sending…',
            attOk: s => `Attendance recorded: ${s}.`, attAlready: s => `Already recorded: ${s}.`,
            errCode: 'This QR code has expired. Scan the code on the screen again.',
            errToken: 'Your sign-in has expired. Sign out and sign in again.', errNet: 'No connection to the server. Try again.',
            teacherBtn: 'Instructor access', teacherPrompt: 'Instructor sign-in:', teacherDenied: 'This account is not an instructor account.',
            session: 'Session', showCode: 'Show code', full: 'Full screen', changes: s => `New code in ${s} s`,
            examOpen: 'Exam open', examClosed: 'Exam closed', openExam: 'Open the exam', closeExam: 'Close the exam',
            closeAt: 'Latest end (optional, today, hh:mm)', showScore: 'Show students their score after submitting',
            finalize: 'Grade unfinished attempts whose time is over', refresh: 'Refresh counts',
            counts: (st, sb) => `Exam: ${st} started, ${sb} submitted.`, attCounts: 'Attendance by session',
            finalized: n => `${n} attempt(s) graded.`
        },
        ro: {
            title: 'Prezență și examen',
            intro: 'Prezența: scanați cu telefonul codul QR afișat pe ecran și autentificați-vă cu contul Google ASE (@stud.ase.ro). Prezența se înregistrează automat.',
            scan: 'Scanați codul QR afișat pe ecran pentru a vă înregistra prezența.', signinQr: 'Autentificați-vă cu contul ASE pentru a vă înregistra prezența.',
            examLink: 'Deschide pagina examenului', examNote: 'Examenul final: vineri, 27 noiembrie 2026, pe acest site.',
            signin: 'Autentificați-vă cu contul ASE pentru a continua.', signedAs: 'Autentificat ca', logout: 'Ieșire',
            wrongDomain: 'Folosiți contul ASE (@stud.ase.ro sau @ase.ro).',
            code: 'Codul afișat pe ecran', send: 'Înregistrează prezența', sending: 'Se trimite…',
            attOk: s => `Prezența a fost înregistrată: ${s}.`, attAlready: s => `Prezența era deja înregistrată: ${s}.`,
            errCode: 'Acest cod QR a expirat. Scanați din nou codul de pe ecran.',
            errToken: 'Autentificarea a expirat. Ieșiți și autentificați-vă din nou.', errNet: 'Nu există conexiune cu serverul. Încercați din nou.',
            teacherBtn: 'Acces profesor', teacherPrompt: 'Autentificare profesor:', teacherDenied: 'Acest cont nu este cont de profesor.',
            session: 'Ședința', showCode: 'Afișează codul', full: 'Ecran complet', changes: s => `Cod nou în ${s} s`,
            examOpen: 'Examen deschis', examClosed: 'Examen închis', openExam: 'Deschide examenul', closeExam: 'Închide examenul',
            closeAt: 'Ora-limită de final (opțional, azi, hh:mm)', showScore: 'Studenții își văd scorul după predare',
            finalize: 'Notează încercările nepredate cu timpul expirat', refresh: 'Actualizează',
            counts: (st, sb) => `Examen: ${st} începute, ${sb} predate.`, attCounts: 'Prezența pe ședințe',
            finalized: n => `${n} încercări notate.`
        }
    }[LANG];

    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const store = {
        get(k) { try { return sessionStorage.getItem('ba-' + k); } catch (e) { return null; } },
        set(k, v) { try { sessionStorage.setItem('ba-' + k, v); } catch (e) { /* private mode */ } },
        del(k) { try { sessionStorage.removeItem('ba-' + k); } catch (e) { /* private mode */ } }
    };

    function decodeJwt(t) {
        try {
            const b = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(decodeURIComponent(atob(b).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
        } catch (e) { return null; }
    }

    function user(key) {
        const cred = store.get(key);
        const u = cred && decodeJwt(cred);
        if (!u || u.exp * 1000 < Date.now()) return null;
        return { name: u.name || u.email, email: String(u.email).toLowerCase(), credential: cred };
    }

    // text/plain avoids a CORS preflight; the backend parses the JSON body
    function api(body) {
        return fetch(CFG.BACKEND_URL, {
            method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body)
        }).then(r => r.json());
    }

    // ---------------------------------------------------------- Google sign-in
    // one GIS initialisation; the callback goes to whichever box asked for the sign-in
    let pending = null;
    function gisReady() {
        if (gisReady.done) return true;
        if (!(window.google && google.accounts && google.accounts.id)) return false;
        google.accounts.id.initialize({ client_id: CFG.GOOGLE_CLIENT_ID, auto_select: false,
            callback: resp => pending && pending(resp.credential) });
        gisReady.done = true;
        return true;
    }

    // draws a sign-in button in el; onCred(credential) when the person signs in
    function signInButton(el, onCred) {
        if (DEV) {
            el.innerHTML = `<input type="email" placeholder="dev e-mail" style="padding:0.4rem"> <button class="btn btn-outline" type="button">Dev sign-in</button>`;
            el.querySelector('button').onclick = () => {
                const email = el.querySelector('input').value.trim().toLowerCase();
                const pl = { email, name: email.split('@')[0], email_verified: true, aud: CFG.GOOGLE_CLIENT_ID, exp: Math.floor(Date.now() / 1000) + 3600 };
                onCred('dev.' + btoa(unescape(encodeURIComponent(JSON.stringify(pl)))).replace(/=+$/, '') + '.dev');
            };
            return;
        }
        const draw = () => {
            if (el.dataset.drawn || !gisReady()) return;
            el.dataset.drawn = '1';
            google.accounts.id.renderButton(el, { theme: 'outline', size: 'large', text: 'signin_with', locale: LANG, width: 280,
                click_listener: () => { pending = onCred; } });
        };
        draw();
        if (!el.dataset.drawn) {
            const t = setInterval(() => { draw(); if (el.dataset.drawn) clearInterval(t); }, 300);
            setTimeout(() => clearInterval(t), 15000);
        }
    }

    // ---------------------------------------------------------- attendance box (index pages)
    // Attendance only through the QR code shown on the screen (as on the MFM site): the QR opens this page
    // with ?att=<code>; after sign-in the attendance is sent automatically. There is no code field.
    const QR_CODE = (new URLSearchParams(location.search).get('att') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    let qrSent = false;

    function renderAttendance(result) {
        const box = $('att-box');
        const u = user('cred');
        box.style.display = QR_CODE || result ? '' : 'none';   // nothing to show until a QR code is scanned
        if (!QR_CODE && !result) return;
        if (!u) {
            box.innerHTML = `<p>${TXT.signinQr}</p><div class="g-btn"></div><p class="login-msg" aria-live="polite"></p>`;
            signInButton(box.querySelector('.g-btn'), cred => {
                const p = decodeJwt(cred);
                if (!p || !ALLOWED.includes(String(p.email).split('@')[1])) {
                    box.querySelector('.login-msg').textContent = TXT.wrongDomain;
                    return;
                }
                store.set('cred', cred);
                renderAttendance();
            });
            return;
        }
        box.innerHTML = `<p>${TXT.signedAs} <strong>${esc(u.name)}</strong> (${esc(u.email)})
            <button class="btn btn-outline btn-sm" id="att-logout" type="button">${TXT.logout}</button></p>
            <p class="att-msg ${result ? result.cls : ''}" id="att-msg" aria-live="polite">${result ? esc(result.text) : TXT.sending}</p>`;
        $('att-logout').onclick = () => { store.del('cred'); renderAttendance(result); };
        if (result || qrSent) return;
        qrSent = true;
        api({ action: 'attend', credential: u.credential, code: QR_CODE }).then(j => {
            history.replaceState(null, '', location.pathname + location.hash);
            if (j.ok) renderAttendance({ cls: 'ok', text: j.already ? TXT.attAlready(j.session) : TXT.attOk(j.session) });
            else if (j.error === 'token') { store.del('cred'); qrSent = false; renderAttendance(); }
            else renderAttendance({ cls: 'err', text: j.error === 'code' ? TXT.errCode : TXT.errNet });
        }).catch(() => { qrSent = false; renderAttendance({ cls: 'err', text: TXT.errNet }); });
    }

    // ---------------------------------------------------------- instructor panel (index pages)
    const isInstructor = email => (CFG.INSTRUCTORS || []).map(e => e.toLowerCase()).includes(String(email || '').toLowerCase());
    let codeTimer = null;

    function renderTeacher() {
        const box = $('teacher-box'), btn = $('teacher-btn');
        clearInterval(codeTimer);
        const t = user('teacher');
        if (!t || !isInstructor(t.email)) {
            box.hidden = true;
            btn.textContent = TXT.teacherBtn;
            btn.onclick = () => {
                if (!box.hidden) { box.hidden = true; return; }
                box.hidden = false;
                box.innerHTML = `<p>${TXT.teacherPrompt}</p><div class="g-btn"></div><p class="login-msg" aria-live="polite"></p>`;
                signInButton(box.querySelector('.g-btn'), cred => {
                    const p = decodeJwt(cred);
                    if (!p || !isInstructor(p.email)) { box.querySelector('.login-msg').textContent = TXT.teacherDenied; return; }
                    store.set('teacher', cred);
                    renderTeacher();
                });
            };
            return;
        }
        btn.textContent = `${TXT.logout} (${t.email})`;
        btn.onclick = () => { store.del('teacher'); renderTeacher(); };
        box.hidden = false;
        box.innerHTML = `<div class="tp-row"><label for="tp-session">${TXT.session}</label> <select id="tp-session"></select>
              <button class="btn btn-primary btn-sm" id="tp-show" type="button">${TXT.showCode}</button>
              <button class="btn btn-outline btn-sm" id="tp-full" type="button">${TXT.full}</button></div>
            <div class="code-display" id="tp-display" hidden>
              <div class="cd-label" id="tp-label"></div>
              <div class="cd-main"><div class="cd-code" id="tp-code"></div><div class="cd-qr" id="tp-qr"></div></div>
              <div class="cd-url" id="tp-url"></div><div class="cd-next" id="tp-next"></div>
            </div>
            <div class="tp-exam" id="tp-exam"></div>
            <p class="login-msg" id="tp-msg" aria-live="polite"></p>`;
        $('tp-full').onclick = () => { const d = $('tp-display'); if (!d.hidden && d.requestFullscreen) d.requestFullscreen(); };
        $('tp-show').onclick = () => showCode();
        status();
    }

    function teacherCall(body) {
        const t = user('teacher');
        if (!t) { renderTeacher(); return Promise.reject(new Error('expired')); }
        return api(Object.assign({ credential: t.credential }, body)).then(j => {
            if (!j.ok && j.error === 'token') { store.del('teacher'); renderTeacher(); throw new Error('token'); }
            return j;
        });
    }

    function fillSessions(sessions) {
        const sel = $('tp-session');
        if (!sel || sel.options.length) return;
        sel.innerHTML = sessions.map(([id, label]) => `<option value="${esc(id)}">${esc(label)}</option>`).join('');
        const today = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '');
        const hit = sessions.find(([, label]) => label.includes(today.split(' ').slice(0, 2).join(' ')));
        if (hit) sel.value = hit[0];
    }

    function loadQr() {
        if (window.QRCode) return Promise.resolve();
        return new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
        });
    }

    function showCode() {
        clearInterval(codeTimer);
        const session = $('tp-session').value;
        teacherCall({ action: 'code', session }).then(j => {
            if (!j.ok) { $('tp-msg').textContent = j.error; return; }
            const skew = j.now - Date.now();
            const base = location.origin + location.pathname.replace(/[^/]*$/, '');
            const url = `${base}${LANG === 'ro' ? 'index_ro.html' : ''}?att=${j.code}#attendance`;
            $('tp-display').hidden = false;
            $('tp-label').textContent = j.label;
            $('tp-code').textContent = j.code;
            $('tp-url').textContent = base.replace(/^https?:\/\//, '') + '  →  ' + TXT.title;
            loadQr().then(() => {
                const q = $('tp-qr');
                q.innerHTML = '';
                new QRCode(q, { text: url, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
            }).catch(() => { $('tp-qr').textContent = ''; });
            const tick = () => {
                const left = Math.max(0, Math.round((j.next - (Date.now() + skew)) / 1000));
                $('tp-next').textContent = TXT.changes(left);
                if (left <= 0) showCode();
            };
            tick();
            codeTimer = setInterval(tick, 1000);
            renderExamCtl(j);
        }).catch(() => { $('tp-msg').textContent = TXT.errNet; });
    }

    function status() {
        return teacherCall({ action: 'status' }).then(j => {
            fillSessions(j.sessions || []);
            renderExamCtl(j);
        }).catch(() => { /* handled in teacherCall */ });
    }

    function renderExamCtl(j) {
        if (j.sessions) fillSessions(j.sessions);
        if (!j.attendance && !j.exam) return;
        if (typeof j.exam === 'boolean') { status(); return; }
        const ex = j.exam, box = $('tp-exam');
        const att = Object.keys(j.attendance || {}).map(k => `${esc(k)}: ${j.attendance[k]}`).join(' · ') || '–';
        box.innerHTML = `<p><strong class="${ex.open ? 'ok' : 'err'}">${ex.open ? TXT.examOpen : TXT.examClosed}</strong> · ${TXT.counts(ex.started, ex.submitted)}</p>
            <div class="tp-row">
              <label for="tp-close">${TXT.closeAt}</label> <input id="tp-close" type="time" value="${ex.closeAt ? new Date(ex.closeAt).toTimeString().slice(0, 5) : ''}">
              <label><input type="checkbox" id="tp-score" ${ex.showScore ? 'checked' : ''}> ${TXT.showScore}</label>
            </div>
            <div class="tp-row">
              <button class="btn ${ex.open ? 'btn-outline' : 'btn-secondary'} btn-sm" id="tp-toggle" type="button">${ex.open ? TXT.closeExam : TXT.openExam}</button>
              <button class="btn btn-outline btn-sm" id="tp-final" type="button">${TXT.finalize}</button>
              <button class="btn btn-outline btn-sm" id="tp-refresh" type="button">${TXT.refresh}</button>
            </div>
            <p class="tp-att"><strong>${TXT.attCounts}:</strong> ${att}</p>`;
        $('tp-toggle').onclick = () => {
            const hm = $('tp-close').value;
            let closeAt = null;
            if (hm) { const d = new Date(); const [h, m] = hm.split(':'); d.setHours(+h, +m, 0, 0); closeAt = d.getTime(); }
            teacherCall({ action: 'exam_toggle', open: !ex.open, closeAt, showScore: $('tp-score').checked }).then(renderExamCtl);
        };
        $('tp-score').onchange = () => teacherCall({ action: 'exam_toggle', open: ex.open, closeAt: ex.closeAt, showScore: $('tp-score').checked }).then(renderExamCtl);
        $('tp-final').onclick = () => teacherCall({ action: 'finalize' }).then(r => { $('tp-msg').textContent = TXT.finalized(r.finalized || 0); status(); });
        $('tp-refresh').onclick = status;
    }

    // ---------------------------------------------------------- entry
    window.BA_PORTAL = { ENABLED, DEV, TXT, LANG, CFG, api, user, store, decodeJwt, signInButton, esc, ALLOWED };

    document.addEventListener('DOMContentLoaded', () => {
        const sec = $('attendance');
        if (!sec) return;
        if (!ENABLED) { sec.hidden = true; document.querySelectorAll('a[href="#attendance"]').forEach(a => a.parentElement.hidden = true); return; }
        sec.hidden = false;
        $('att-title').textContent = TXT.title;
        $('att-intro').textContent = TXT.intro;
        $('exam-note').textContent = TXT.examNote;
        $('exam-link').textContent = TXT.examLink;
        renderAttendance();
        renderTeacher();
        if (new URLSearchParams(location.search).get('att')) sec.scrollIntoView();
    });
})();
