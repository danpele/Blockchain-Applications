// ============================================================
// Blockchain Applications: online exam page (exam.html). Uses assets/portal.js (sign-in, backend calls).
// The questions arrive from the backend after sign-in and the room code; answers are saved on the
// server while the student works and graded there.
// ============================================================
(function () {
    'use strict';
    const P = window.BA_PORTAL;
    const $ = id => document.getElementById(id);
    const T = {
        signin: 'Sign in with your ASE Google account (@stud.ase.ro) to start or resume the exam.',
        wrongDomain: 'Please use your ASE account (@stud.ase.ro or @ase.ro).',
        signedAs: 'Signed in as', logout: 'Sign out',
        codeLbl: 'Exam code shown on the screen', start: 'Start the exam', starting: 'Starting…',
        closed: 'The exam is not open yet. Wait for the instructor, then try again.',
        badCode: 'This code is not valid now. Check it on the screen (it changes every minute) and try again.',
        expired: 'Your sign-in has expired. Sign out and sign in again.', net: 'No connection to the server. Try again.',
        disabled: 'The online exam is not configured yet.',
        left: 'Time left', answered: (a, n) => `Answered ${a} / ${n}`,
        saved: t => `Saved ${t}`, saving: 'Saving…', unsaved: 'Not saved yet: retrying…',
        submit: 'Submit the exam', confirmQ: (a, n) => `You answered ${a} of ${n} questions. After submitting you cannot change your answers.`,
        confirmYes: 'Submit now', confirmNo: 'Back to the exam',
        other: 'This exam was opened in another window or device. Reload this page to continue here.',
        done: t => `Your answers were submitted at ${t}. You may close this page.`,
        score: s => `Score: ${s.correct} of ${s.n} answers correct, ${s.total} / 100.`,
        timeUp: 'Time is over: your answers are being submitted.',
        question: 'Question', caseLbl: 'Case'
    };

    const state = { email: null, token: null, deadline: 0, skew: 0, paper: null, answers: {}, focus: 0,
                    dirty: false, saving: false, finished: false, timer: null, saveTimer: null };

    function fmtTime(ms) { return new Date(ms).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }

    // ---------------------------------------------------------- stage 1-2: sign-in and code
    function renderGate(msg) {
        const box = $('exam-gate');
        box.hidden = false;
        $('exam-paper').hidden = true;
        if (!P.ENABLED) { box.innerHTML = `<p>${T.disabled}</p>`; return; }
        const u = P.user('cred');
        if (!u) {
            box.innerHTML = `<p>${T.signin}</p><div class="g-btn"></div><p class="login-msg" aria-live="polite">${msg || ''}</p>`;
            P.signInButton(box.querySelector('.g-btn'), cred => {
                const p = P.decodeJwt(cred);
                if (!p || !P.ALLOWED.includes(String(p.email).split('@')[1])) { box.querySelector('.login-msg').textContent = T.wrongDomain; return; }
                P.store.set('cred', cred);
                tryStart('');
            });
            return;
        }
        box.innerHTML = `<p>${T.signedAs} <strong>${P.esc(u.name)}</strong> (${P.esc(u.email)})
              <button class="btn btn-outline btn-sm" id="ex-logout" type="button">${T.logout}</button></p>
            <form class="att-form" id="ex-form" autocomplete="off">
              <label for="ex-code">${T.codeLbl}</label>
              <input id="ex-code" class="code-input" maxlength="6" autocapitalize="characters" spellcheck="false" required>
              <button class="btn btn-primary" type="submit">${T.start}</button>
            </form>
            <p class="att-msg err" id="ex-msg" aria-live="polite">${msg || ''}</p>`;
        $('ex-logout').onclick = () => { P.store.del('cred'); renderGate(); };
        $('ex-form').onsubmit = ev => { ev.preventDefault(); tryStart($('ex-code').value); };
    }

    function tryStart(code) {
        const u = P.user('cred');
        if (!u) { renderGate(T.expired); return; }
        const m = $('ex-msg');
        if (m) { m.className = 'att-msg'; m.textContent = T.starting; }
        P.api({ action: 'exam_start', credential: u.credential, code }).then(j => {
            if (j.ok && j.finished) { showDone(j); return; }
            if (j.ok) { begin(j); return; }
            if (j.error === 'token') { P.store.del('cred'); renderGate(T.expired); return; }
            renderGate(j.error === 'closed' ? T.closed : code === '' ? '' : j.error === 'code' ? T.badCode : T.net);
        }).catch(() => renderGate(T.net));
    }

    // ---------------------------------------------------------- stage 3: the paper
    function begin(j) {
        Object.assign(state, { email: j.email, token: j.token, deadline: j.deadline, skew: j.now - Date.now(),
                               paper: j.paper, answers: j.answers || {}, finished: false });
        $('exam-gate').hidden = true;
        const root = $('exam-paper');
        root.hidden = false;
        const qs = j.paper.questions;
        let html = '', lastCase = undefined, n = 0, nCase = 0;
        qs.forEach(q => {
            if (q.case && q.case !== lastCase) {
                html += `<div class="ex-case"><h3>${T.caseLbl} ${++nCase}: ${j.paper.cases[q.case].title}</h3>${j.paper.cases[q.case].html}</div>`;
            }
            lastCase = q.case;
            n++;
            html += `<fieldset class="ex-q" id="q${q.k}"><legend><span class="ex-num">${T.question} ${n}</span></legend>
                <div class="ex-stem">${q.stem}</div>
                ${q.options.map((o, i) => `<label class="ex-opt"><input type="radio" name="a${q.k}" value="${i}" ${state.answers[q.k] === i ? 'checked' : ''}>
                    <span class="ex-letter">${'abcde'[i]})</span> <span>${o}</span></label>`).join('')}
              </fieldset>`;
        });
        html += `<div class="ex-end"><button class="btn btn-primary btn-lg" id="ex-submit" type="button">${T.submit}</button></div>`;
        $('ex-body').innerHTML = html;
        $('ex-who').textContent = `${j.name} (${j.email})`;
        $('ex-body').onchange = ev => {
            const t = ev.target;
            if (t.type !== 'radio') return;
            state.answers[Number(t.name.slice(1))] = Number(t.value);
            state.dirty = true;
            progress();
            clearTimeout(state.saveTimer);
            state.saveTimer = setTimeout(save, 1200);
        };
        $('ex-submit').onclick = confirmSubmit;
        progress();
        clearInterval(state.timer);
        state.timer = setInterval(tick, 1000);
        tick();
        setInterval(() => { if (state.dirty) save(); }, 30000);
    }

    function progress() {
        const n = state.paper.questions.length, a = Object.keys(state.answers).filter(k => state.answers[k] !== null).length;
        $('ex-progress').textContent = T.answered(a, n);
        return [a, n];
    }

    function tick() {
        if (state.finished) return;
        const left = state.deadline - (Date.now() + state.skew);
        const s = Math.max(0, Math.floor(left / 1000));
        $('ex-timer').textContent = `${T.left} ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
        $('ex-timer').classList.toggle('low', s < 300);
        if (left <= 0) { clearInterval(state.timer); $('ex-save').textContent = T.timeUp; save(true); }
    }

    function save(submit) {
        if (state.finished || (state.saving && !submit)) return;
        state.saving = true;
        state.dirty = false;
        $('ex-save').textContent = T.saving;
        P.api({ action: submit ? 'exam_submit' : 'exam_save', email: state.email, token: state.token,
                answers: state.answers, focus: state.focus }).then(j => {
            state.saving = false;
            if (j.ok && j.finished) { showDone(j); return; }
            if (j.ok) { $('ex-save').textContent = T.saved(fmtTime(j.saved)); $('ex-save').classList.remove('err'); return; }
            if (j.error === 'session') { state.finished = true; clearInterval(state.timer); $('ex-save').textContent = T.other; $('ex-save').classList.add('err'); return; }
            throw new Error(j.error);
        }).catch(() => {
            state.saving = false;
            state.dirty = true;
            $('ex-save').textContent = T.unsaved;
            $('ex-save').classList.add('err');
            setTimeout(() => save(submit), 5000);
        });
    }

    function confirmSubmit() {
        const [a, n] = progress();
        const dlg = $('ex-dialog');
        $('ex-dialog-text').textContent = T.confirmQ(a, n);
        $('ex-yes').textContent = T.confirmYes;
        $('ex-no').textContent = T.confirmNo;
        dlg.hidden = false;
        $('ex-no').onclick = () => { dlg.hidden = true; };
        $('ex-yes').onclick = () => { dlg.hidden = true; save(true); };
    }

    // ---------------------------------------------------------- stage 4: done
    function showDone(j) {
        state.finished = true;
        clearInterval(state.timer);
        $('exam-paper').hidden = true;
        const box = $('exam-gate');
        box.hidden = false;
        box.innerHTML = `<p class="ex-done">${T.done(fmtTime(j.submitted))}</p>` + (j.score ? `<p>${T.score(j.score)}</p>` : '');
        window.scrollTo(0, 0);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && state.paper && !state.finished) { state.focus++; state.dirty = true; }
    });
    window.addEventListener('beforeunload', ev => {
        if (state.paper && !state.finished && (state.dirty || state.saving)) { ev.preventDefault(); ev.returnValue = ''; }
    });

    document.addEventListener('DOMContentLoaded', () => {
        if (P.ENABLED && P.user('cred')) tryStart(''); else renderGate();
    });
})();
