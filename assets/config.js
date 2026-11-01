// ============================================================
// Blockchain Applications site configuration (index.html, index_ro.html, exam.html)
// GOOGLE_CLIENT_ID: OAuth client (Web) of the Google Cloud project "MFM Quiz Login", shared with the
//   MFM, SFM and TSA sites (same origin https://danpele.github.io); sign-in with an ASE account.
// BACKEND_URL: Google Apps Script web app "BA 2026-2027 - Attendance and exam" (not published):
//   attendance codes, the online exam (questions and key stay on the server) and the instructor panel.
// INSTRUCTORS: accounts that see the instructor panel (the backend checks them again).
// Values starting with 'YOUR_' are treated as not configured: the site then hides attendance and exam.
// ============================================================
window.BA_CONFIG = {
    GOOGLE_CLIENT_ID: '1095360272769-rhjjncfor0gumhev6a0l6tnnrnmdrnna.apps.googleusercontent.com',
    BACKEND_URL: 'https://script.google.com/macros/s/AKfycbybDIg0xXJkBqRzqFcO46APRlmplmUxdBSqBrxm5bON4dilxZ4vgsxNZ9VfKgAUpGEm/exec',
    INSTRUCTORS: ['danpele@ase.ro', 'ilan.alon@uni-corvinus.hu', 'alonilan@gmail.com']
};
