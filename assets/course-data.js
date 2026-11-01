// ============================================================
// Blockchain Applications course data (EN + RO pages; the lectures themselves are in English). Rendered by assets/site.js.
// To publish a lecture: set available: true and fill in its links.
// ============================================================
(function () {
    const REPO = 'https://github.com/danpele/Blockchain-Applications';
    const COLAB = 'https://colab.research.google.com/github/danpele/Blockchain-Applications/blob/main/';
    const QN = id => 'https://quantinar.com/watch/courseclass/' + id;

    // Quantinar units of the Blockchain Analytics course, by key
    const Q = {
        cryptosNfts: ['Cryptos, NFTs, Digital Assets', QN(1356)],
        bcIntro: ['Blockchain Technology – An Introduction', QN(1029)],
        understanding: ['Understanding Cryptocurrencies', QN(1017)],
        mechanism: ['Blockchain Mechanism and Distributional Characteristics of Cryptos', QN(1639)],
        returns: ['Crypto Currency Returns', QN(1729)],
        robustMarkowitz: ['Robust Markowitz for Crypto-Assets', QN(1668)],
        frm: ['FRM for Cryptos', QN(1044)],
        networks: ['Dynamic Crypto Networks', QN(1046)],
        crossExchange: ['Cross-exchange Crypto Risk', QN(1399)],
        reddit: ['Reddit Sentiment and BTC Returns', QN(1537)],
        musk: ["Elon Musk's Twitter Feed", QN(2071)],
        dai: ['DAI Digital Art Index', QN(1354)],
        aiBlockchain: ['AI Meets Blockchain', QN(2116)],
        p2p: ['Crypto-Backed P2P Lending', QN(2081)]
    };
    const q = (...keys) => keys.map(k => ({ title: Q[k][0], url: Q[k][1] }));

    // links of lecture n: slides, lecture notebook (GitHub + Colab), Quantlets
    // lectures whose notebook / Quantlets are already in the repo
    const NB_READY = [1, 2, 3, 4, 5, 6, 7];
    const QL_READY = [1, 2, 3, 4, 5, 6, 7];
    const L = (n, base) => ({
        en: [
            { type: 'slides', href: `EN/Lectures/lecture${n}_${base}.pdf` },
            ...(NB_READY.includes(n) ? [{ type: 'lectureNb', href: `${REPO}/blob/main/notebooks/lecture${n}_notebook.ipynb`, colab: `${COLAB}notebooks/lecture${n}_notebook.ipynb` }] : []),
            ...(QL_READY.includes(n) ? [{ type: 'quantlets', href: `${REPO}/tree/main/Quantlets/L${n}` }] : [])
        ]
    });

    window.MFM_DATA = {
        repo: REPO,

        ui: {
            en: {
                pageTitle: 'Blockchain Applications - Course Website',
                courseTitle: 'Blockchain Applications',
                subtitle: "Master's programme Blockchain for Business (MBB) | Faculty of Business Administration in Foreign Languages (FABIZ) | Bucharest University of Economic Studies",
                nav: { home: 'Home', chapters: 'Blockchain Analytics', project: 'Crypto Economics', assessment: 'Assessment', quizzes: 'Quizzes', resources: 'Resources', contact: 'Contact' },
                quizzes: 'Practice Quizzes',
                quizIntro: 'Each attempt draws 15 questions at random from the lecture bank and shuffles the answers. An answer is locked once selected. The quizzes are for practice: they do not count towards the grade and no score is stored.',
                quizSoon: 'The quiz for this lecture is not published yet.',
                question: 'Question', correct: 'Correct!', incorrect: 'Incorrect.', correctIs: 'The correct answer is',
                calc: 'Calculate Score', reset: 'New attempt', score: 'Score', unanswered: 'questions unanswered',
                verdicts: ['Keep practicing!', 'Keep studying!', 'Good job!', 'Excellent!'],
                detailed: 'Detailed Results',
                colQ: 'Q', colQuestion: 'Question', colCorrect: 'Correct answer', colYours: 'Your answer', colResult: 'Result',
                overview: 'Course Overview',
                objectives: 'Learning Outcomes',
                heroTag: 'One course in two parts. <strong>Crypto Economics</strong> asks how crypto applications create and capture value, through cases and a due-diligence project. <strong>Blockchain Analytics</strong> treats the same applications as data generators: every transaction, fee and transfer is public and time-stamped, and seven lectures turn that data into statistical evidence, with Colab notebooks.',
                heroCta1: 'Part 1: Crypto Economics',
                heroCta2: 'Part 2: Blockchain Analytics',
                chapters: 'Part 2: Blockchain Analytics (Prof. Daniel Traian Pele)',
                chapter: 'Lecture',
                comingSoon: 'Coming soon',
                quantinar: 'Video units on Quantinar',
                formulas: 'Key Formulas',
                links: {
                    slides: 'Slides', lectureNb: 'Notebook', quantlets: 'Quantlets', interactive: 'Interactive', web: 'Web page', colab: 'Open in Colab'
                },
                linkRows: { course: 'Lecture', code: 'Code' },
                projectTitle: 'Part 1: Crypto Economics (Prof. Ilan Alon)',
                seminarIntro: 'Prof. Ilan Alon examines blockchain, crypto economics and business strategy through five cases and a due-diligence project. Weekdays 17:30–19:00 and 19:10–20:40; the last hour of each weekday (19:40–20:40) is guided project work, with the instructor advising each team. Saturday 21 November, 09:10–15:40, is reserved for the team presentations. Prepare the reading, case or whitepaper before each day. Part 2 builds on these sessions and does not repeat them.',
                assessmentTitle: 'Assessment',
                colSession: 'Day', colTopic: 'Focus', colPrep: 'Readings and case', colVideo: 'Videos', colProj: 'Project hour',
                resources: 'Resources',
                bibliography: 'Core texts (Part 2)',
                dataSources: 'Data sources',
                contact: 'Contact',
                instructor: 'Part 2: Blockchain Analytics; exam',
                seminarCard: 'Part 1: Crypto Economics; project',
                seminarRole: 'Ariel University and Corvinus University of Budapest',
                office: 'Questions',
                officeText: 'By e-mail, or before and after class',
                close: 'Close',
                footer: 'Blockchain Applications | Master Blockchain for Business | Bucharest University of Economic Studies'
            },
            ro: {
                pageTitle: 'Blockchain Applications - Site-ul cursului',
                courseTitle: 'Blockchain Applications',
                subtitle: 'Masterul Blockchain for Business (MBB) | Facultatea de Administrarea Afacerilor, cu predare în limbi străine (FABIZ) | Academia de Studii Economice din București',
                nav: { home: 'Acasă', chapters: 'Blockchain Analytics', project: 'Crypto Economics', assessment: 'Evaluare', quizzes: 'Quiz-uri', resources: 'Resurse', contact: 'Contact' },
                quizzes: 'Quiz-uri de exersare',
                quizIntro: 'La fiecare încercare se extrag aleator 15 întrebări din banca de întrebări a cursului, iar variantele de răspuns sînt amestecate. Răspunsul se blochează după selectare. Quiz-urile sînt pentru exersare: nu intră în notă și scorul nu se salvează. Întrebările sînt în engleză, ca și cursurile.',
                quizSoon: 'Quiz-ul acestui curs nu este publicat încă.',
                question: 'Întrebarea', correct: 'Corect!', incorrect: 'Greșit.', correctIs: 'Răspunsul corect este',
                calc: 'Calculează scorul', reset: 'Încercare nouă', score: 'Scor', unanswered: 'întrebări fără răspuns',
                verdicts: ['Mai exersează!', 'Mai studiază!', 'Bine!', 'Excelent!'],
                detailed: 'Rezultate detaliate',
                colQ: 'Nr.', colQuestion: 'Întrebare', colCorrect: 'Răspuns corect', colYours: 'Răspunsul tău', colResult: 'Rezultat',
                overview: 'Prezentarea cursului',
                objectives: 'Rezultatele învățării',
                heroTag: 'O disciplină în două părți. <strong>Crypto Economics</strong> arată cum creează și captează valoare aplicațiile cripto, prin studii de caz și un proiect de due diligence. <strong>Blockchain Analytics</strong> tratează aceleași aplicații ca generatoare de date: fiecare tranzacție, comision și transfer este public și are o marcă de timp, iar șapte cursuri transformă aceste date în dovezi statistice, cu notebook-uri Colab.',
                heroCta1: 'Partea 1: Crypto Economics',
                heroCta2: 'Partea 2: Blockchain Analytics',
                chapters: 'Partea 2: Blockchain Analytics (prof. Daniel Traian Pele)',
                chapter: 'Cursul',
                comingSoon: 'În curînd',
                quantinar: 'Unități video pe Quantinar',
                formulas: 'Formule cheie',
                links: {
                    slides: 'Slide-uri', lectureNb: 'Notebook', quantlets: 'Quantlets', interactive: 'Interactiv', web: 'Pagina web', colab: 'Deschide în Colab'
                },
                linkRows: { course: 'Curs', code: 'Cod' },
                projectTitle: 'Partea 1: Crypto Economics (prof. Ilan Alon)',
                seminarIntro: 'Prof. Ilan Alon analizează tehnologia blockchain, economia cripto și strategia de afaceri prin cinci studii de caz și un proiect de due diligence. În zilele lucrătoare 17:30–19:00 și 19:10–20:40; ultima oră din fiecare zi (19:40–20:40) este lucru ghidat la proiect, cu profesorul care consiliază fiecare echipă. Sîmbăta, 21 noiembrie, 09:10–15:40, este rezervată prezentărilor echipelor. Pregătiți lectura, studiul de caz sau whitepaper-ul înaintea fiecărei zile. Partea 2 pornește de la aceste întîlniri și nu le repetă.',
                assessmentTitle: 'Evaluare',
                colSession: 'Ziua', colTopic: 'Tema', colPrep: 'Lecturi și studiu de caz', colVideo: 'Videoclipuri', colProj: 'Ora de proiect',
                resources: 'Resurse',
                bibliography: 'Texte de bază (Partea 2)',
                dataSources: 'Surse de date',
                contact: 'Contact',
                instructor: 'Partea 2: Blockchain Analytics; examen',
                seminarCard: 'Partea 1: Crypto Economics; proiect',
                seminarRole: 'Ariel University și Corvinus University of Budapest',
                office: 'Întrebări',
                officeText: 'Pe e-mail sau înainte și după curs',
                close: 'Închide',
                footer: 'Blockchain Applications | Masterul Blockchain for Business | Academia de Studii Economice din București'
            }
        },

        overview: {
            en: [
                { h: 'Programme', p: ['Master Blockchain for Business (MBB), year I, semester I, 2026–2027', 'Taught in English; one course in two parts'] },
                { h: 'Part 1: Crypto Economics', p: ['Prof. Ilan Alon, Mon 16 – Sat 21 November 2026', 'Weekdays 17:30–20:40, Saturday 09:10–15:40 (28 academic hours)'] },
                { h: 'Part 2: Blockchain Analytics', p: ['Prof. Daniel Traian Pele, 7 lectures', 'Mon 23 Nov (L1–L2), Tue 24 Nov (L3–L4), Wed 25 Nov (L5–L6), Thu 26 Nov (L7)'] },
                { h: 'Exam', p: ['Friday 27 November 2026, 90 minutes, on this site, in the room', 'Both parts; every student gets a personal paper'] },
                { h: 'Grade', p: ['50% due-diligence project (Part 1)', '50% exam (both parts, one paper)'] },
                { h: 'Tools', p: ['Google Colab notebooks in Python, run in the browser', 'Sign-in with the ASE Google account for attendance and the exam'] }
            ],
            ro: [
                { h: 'Program', p: ['Masterul Blockchain for Business (MBB), anul I, semestrul I, 2026–2027', 'Predare în limba engleză; o disciplină în două părți'] },
                { h: 'Partea 1: Crypto Economics', p: ['Prof. Ilan Alon, luni 16 – sîmbătă 21 noiembrie 2026', 'În zilele lucrătoare 17:30–20:40, sîmbătă 09:10–15:40 (28 de ore academice)'] },
                { h: 'Partea 2: Blockchain Analytics', p: ['Prof. Daniel Traian Pele, 7 cursuri', 'Luni 23 nov. (C1–C2), marți 24 nov. (C3–C4), miercuri 25 nov. (C5–C6), joi 26 nov. (C7)'] },
                { h: 'Examen', p: ['Vineri, 27 noiembrie 2026, 90 de minute, pe acest site, în sală', 'Ambele părți; fiecare student primește un subiect personal'] },
                { h: 'Nota', p: ['50% proiectul de due diligence (Partea 1)', '50% examenul (ambele părți, un singur subiect)'] },
                { h: 'Instrumente', p: ['Notebook-uri Google Colab în Python, rulate în browser', 'Autentificare cu contul Google ASE pentru prezență și examen'] }
            ]
        },

        objectives: {
            en: [
                { h: 'Part 1: Crypto Economics', items: [
                    'Explain blockchain and Web3, and when a blockchain is worth its cost',
                    'Assess smart contracts and decentralised governance',
                    'Analyse token incentives and value capture',
                    'Evaluate crypto business models and digital assets',
                    'Defend an evidence-based due-diligence recommendation'
                ] },
                { h: 'Part 2: Blockchain Analytics', items: [
                    'Collect market and on-chain data from public sources (EODHD, DefiLlama, Coin Metrics, block explorers) and check its quality before any analysis',
                    'Describe crypto returns with the right statistics and test their stylized facts (heavy tails, volatility clustering, changing correlations) against stocks and gold',
                    "Test market efficiency, date bubbles and crashes with drawdowns and the LPPL model, and judge network-value claims such as Metcalfe's law",
                    'Measure risk with EWMA and GARCH volatility, Value-at-Risk (VaR) and Expected Shortfall (ES), and backtest the forecasts',
                    'Monitor stablecoin depeg risk and estimate systemic depegging pressure with quantile regression and the De-pegging Pressure Index (DPI)',
                    'Map crypto markets as networks, classify crypto assets against traditional asset classes, and measure the effect of protocol upgrades and sentiment',
                    'Evaluate machine-learning and AI forecasts out of sample, and detect overfitting and data snooping'
                ] }
            ],
            ro: [
                { h: 'Partea 1: Crypto Economics', items: [
                    'Explicați tehnologia blockchain și Web3 și cînd un blockchain își justifică costul',
                    'Evaluați smart contracts și guvernanța descentralizată',
                    'Analizați stimulentele create de token-uri și captarea valorii (value capture)',
                    'Evaluați modelele de afaceri cripto și activele digitale',
                    'Susțineți o recomandare de due diligence bazată pe dovezi'
                ] },
                { h: 'Partea 2: Blockchain Analytics', items: [
                    'Colectați date de piață și on-chain din surse publice (EODHD, DefiLlama, Coin Metrics, exploratoare de blockchain) și le verificați calitatea înainte de analiză',
                    'Descrieți randamentele cripto cu statisticile potrivite și testați faptele lor stilizate (cozi groase, volatility clustering, corelații care se schimbă în timp) în comparație cu acțiunile și aurul',
                    'Testați eficiența pieței, datați bulele și crahurile cu drawdown-uri și modelul LPPL și evaluați afirmațiile despre valoarea de rețea, precum legea lui Metcalfe',
                    'Măsurați riscul cu volatilitatea EWMA și GARCH, Value-at-Risk (VaR) și Expected Shortfall (ES) și faceți backtesting prognozelor',
                    'Monitorizați riscul de depeg al stablecoin-urilor și estimați presiunea sistemică de depeg cu regresia cuantilă și De-pegging Pressure Index (DPI)',
                    'Reprezentați piețele cripto ca rețele, clasificați criptoactivele în raport cu clasele de active tradiționale și măsurați efectul actualizărilor de protocol și al sentimentului',
                    'Evaluați out-of-sample prognozele cu machine learning și AI și depistați overfitting-ul și data snooping-ul'
                ] }
            ]
        },

        chapterCharts: {
            l1: { src: 'charts/ba_l1_value_activity.png', en: 'Bitcoin market value against on-chain activity, monthly, 2014–2025', ro: 'Valoarea de piață a Bitcoin față de activitatea on-chain, lunar, 2014–2025' },
            l2: { src: 'charts/ba_l2_lppl_btc2017.png', en: 'LPPL fit to the 2017 Bitcoin bubble and its estimated critical time', ro: 'Modelul LPPL estimat pe bula Bitcoin din 2017 și momentul critic estimat' },
            l3: { src: 'charts/ba_l3_var_methods.png', en: 'One-day VaR 1% and ES 2.5% of Bitcoin under four methods', ro: 'VaR 1% și ES 2,5% pe o zi pentru Bitcoin, cu patru metode' },
            l4: { src: 'charts/ba_l4_svb.png', en: 'USDC, DAI and USDT around the March 2023 SVB depeg, in basis points', ro: 'USDC, DAI și USDT în jurul depeg-ului din martie 2023 (SVB), în puncte de bază' },
            l5: { src: 'charts/ba_l5_dpi.png', en: 'De-pegging Pressure Index (DPI), 2020–2026, coloured by quintile', ro: 'De-pegging Pressure Index (DPI), 2020–2026, colorat pe quintile' },
            l6: { src: 'charts/ba_l6_mst.png', en: 'Correlations of daily returns and the minimum spanning tree of 19 crypto assets', ro: 'Corelațiile randamentelor zilnice și arborele de acoperire minim (minimum spanning tree) pentru 19 criptoactive' },
            l7: { src: 'charts/ba_l7_var_models.png', en: 'Bitcoin VaR 1%: breach rates and quantile scores of six models, including Chronos-2', ro: 'VaR 1% pentru Bitcoin: rata depășirilor și scorul cuantil pentru șase modele, inclusiv Chronos-2' }
        },

        chapters: [
            {
                id: 'l1', num: 1, available: true, web: true, interactive: true, date: { en: 'Mon 23 Nov', ro: 'Luni 23 nov.' },
                title: { en: 'Blockchains and Crypto Markets as Data', ro: 'Blockchain-urile și piețele cripto ca date' },
                topics: { en: ['Proof-of-work arithmetic and the supply rule', 'Market concentration: the Herfindahl–Hirschman index (HHI)', 'Data-quality checks on prices and on-chain series', 'Log-linear trends with Newey–West standard errors'], ro: ['Aritmetica proof-of-work și regula de emisiune', 'Concentrarea pieței: indicele Herfindahl–Hirschman (HHI)', 'Verificarea calității datelor pentru prețuri și serii on-chain', 'Trenduri log-liniare cu erori standard Newey–West'] },
                links: L(1, 'blockchains_as_data'),
                quantinar: q('cryptosNfts', 'bcIntro', 'understanding')
            },
            {
                id: 'l2', num: 2, available: true, web: true, interactive: true, date: { en: 'Mon 23 Nov', ro: 'Luni 23 nov.' },
                title: { en: 'Stylized Facts, Efficiency and Bubbles', ro: 'Fapte stilizate, eficiență și bule' },
                topics: { en: ['Moments and the Jarque–Bera test; ACF and Ljung–Box', 'Rolling correlations and variance-ratio tests', 'Drawdowns and the LPPL bubble model', "Metcalfe's law as a model of network value"], ro: ['Momente și testul Jarque–Bera; ACF și testul Ljung–Box', 'Corelații pe ferestre mobile și teste ale raportului varianțelor', 'Drawdown-uri și modelul de bulă LPPL', 'Legea lui Metcalfe ca model al valorii de rețea'] },
                links: L(2, 'stylized_facts_efficiency_bubbles'),
                quantinar: q('mechanism', 'returns')
            },
            {
                id: 'l3', num: 3, available: true, web: true, interactive: true, date: { en: 'Tue 24 Nov', ro: 'Marți 24 nov.' },
                title: { en: 'Volatility and Tail Risk', ro: 'Volatilitate și tail risk' },
                topics: { en: ['EWMA and GARCH(1,1)-t by maximum likelihood; residual diagnostics', 'VaR and ES: Normal, historical, EWMA, GARCH-t', 'Kupiec and Christoffersen backtests; Basel traffic light', 'A short out-of-sample check'], ro: ['EWMA și GARCH(1,1)-t estimat prin verosimilitate maximă; diagnosticul reziduurilor', 'VaR și ES: Normal, istoric, EWMA, GARCH-t', 'Backtesturile Kupiec și Christoffersen; semaforul Basel', 'O verificare out-of-sample scurtă'] },
                links: L(3, 'volatility_tail_risk'),
                quantinar: q('robustMarkowitz')
            },
            {
                id: 'l4', num: 4, available: true, web: true, interactive: true, date: { en: 'Tue 24 Nov', ro: 'Marți 24 nov.' },
                title: { en: 'Stablecoins I: Measuring Depeg Risk and On-Chain Early Warning', ro: 'Stablecoin-uri I: riscul de depeg și avertizarea timpurie on-chain' },
                topics: { en: ['Peg deviations in basis points, exceedance curves and episode counts', 'AMM price impact: constant product and StableSwap', 'Event-level early-warning utility', 'Case: the March 2023 USDC depeg'], ro: ['Abaterile de la paritate în puncte de bază, curbe de depășire și numărul de episoade', 'Impactul asupra prețului în AMM: produs constant și StableSwap', 'Utilitatea avertizării timpurii la nivel de eveniment', 'Studiu de caz: depeg-ul USDC din martie 2023'] },
                links: L(4, 'stablecoins_depeg'),
                quantinar: []
            },
            {
                id: 'l5', num: 5, available: true, web: true, interactive: true, date: { en: 'Wed 25 Nov', ro: 'Miercuri 25 nov.' },
                title: { en: 'Stablecoins II: Systemic Depegging Pressure and Portfolios', ro: 'Stablecoin-uri II: presiunea sistemică de depeg și portofolii' },
                topics: { en: ['Reference-adjusted deviations; check loss and quantile regression', '5% Quantile Lasso with GACV selection', 'The De-pegging Pressure Index (DPI)', 'HAC event tests with Holm correction; out-of-sample check-loss skill'], ro: ['Abateri ajustate față de referință; funcția de pierdere check și regresia cuantilă', 'Quantile Lasso la 5%, cu parametrul ales prin GACV', 'De-pegging Pressure Index (DPI)', 'Teste de eveniment cu erori HAC și corecția Holm; performanța out-of-sample după pierderea check'] },
                links: L(5, 'stablecoins_dpi'),
                quantinar: q('frm')
            },
            {
                id: 'l6', num: 6, available: true, web: true, interactive: true, date: { en: 'Wed 25 Nov', ro: 'Miercuri 25 nov.' },
                title: { en: 'Networks, Sentiment and Asset Classes', ro: 'Rețele, sentiment și clase de active' },
                topics: { en: ['Correlation distance, minimum spanning trees, absorption ratio', 'Diebold–Yilmaz spillovers', 'Factor analysis and k-means classification of asset classes', 'Market-model event study (CAR) and text sentiment'], ro: ['Distanța de corelație, arbori de acoperire minimi, absorption ratio', 'Spillover-uri Diebold–Yilmaz', 'Analiza factorială și clasificarea k-means a claselor de active', 'Studiu de eveniment cu modelul de piață (CAR) și sentimentul din text'] },
                links: L(6, 'networks_sentiment_art'),
                quantinar: q('networks', 'crossExchange', 'reddit', 'musk', 'dai')
            },
            {
                id: 'l7', num: 7, available: true, web: true, interactive: true, date: { en: 'Thu 26 Nov', ro: 'Joi 26 nov.' },
                title: { en: 'Machine Learning, AI and Their Limits; Exam Review', ro: 'Machine learning, AI și limitele lor; recapitulare pentru examen' },
                topics: { en: ['Walk-forward evaluation; Brier score, AUC, Pesaran–Timmermann test', 'Overfitting, SHAP explanations, the deflated Sharpe ratio', 'VaR from GARCH, quantile regression, gradient-boosted trees and Chronos-2', 'Quantile score and Diebold–Mariano tests; look-ahead in pretrained models'], ro: ['Evaluare walk-forward; scorul Brier, AUC, testul Pesaran–Timmermann', 'Overfitting, explicații SHAP, deflated Sharpe ratio', 'VaR din GARCH, regresie cuantilă, gradient-boosted trees și Chronos-2', 'Scorul cuantil și testele Diebold–Mariano; look-ahead în modelele preantrenate'] },
                links: L(7, 'ml_ai_limits'),
                quantinar: q('aiBlockchain', 'p2p')
            }
        ],

        seminars: (function () {
            const a = (t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
            const db = id => 'https://www.dropbox.com/scl/fi/' + id;
            const doi = d => 'https://doi.org/' + d;
            const art = (t, d, id) => `${t} (${a('DOI', doi(d))}, ${a('PDF', db(id))})`;
            const V = {
                btcMacro: a('Alon: Bitcoin and macroeconomics', 'https://www.youtube.com/watch?v=jgK4B21VZIU'),
                ds: a('Demand and supply (playlist)', 'https://www.youtube.com/watch?v=qS0iYdmlbME&list=PL9mBWMaNgGO3oLMi9mxzaknxJeOmogReK'),
                value: a('Alon: value and costs of cryptocurrencies', 'https://www.youtube.com/watch?v=TDQijy-jtUc'),
                eth: a('Alon: Ethereum', 'https://www.youtube.com/watch?v=YVK8qTAsYdM'),
                sc: a('Alon: smart contracts, NFTs and DAOs', 'https://www.youtube.com/watch?v=nYVjkKaqWSU'),
                cbdc: a('Coin Bureau: CBDC updates', 'https://www.youtube.com/watch?v=qSrYJa5ZW_M'),
                wallets: a('Coin Bureau: wallets', 'https://www.youtube.com/watch?v=MYh8XwS3Znc'),
                tokCB: a('Coin Bureau: tokenomics and crypto analysis', 'https://www.youtube.com/watch?v=ftCaqG7wckg'),
                tok: a('Alon: tokenomics', 'https://www.youtube.com/watch?v=VJPntzMXlzI'),
                pitch: a('Analyst-style presentation example', 'https://www.youtube.com/watch?v=EfNlejjM1Cc')
            };
            const R = {
                btc: a('Nakamoto (2008), Bitcoin whitepaper', 'https://bitcoin.org/bitcoin.pdf'),
                ethWp: a('Ethereum whitepaper', 'https://ethereum.org/en/whitepaper'),
                jrz: art('Jiang, Rodríguez &amp; Zhang (2023), <em>Macroeconomic fundamentals and cryptocurrency prices</em>, Financial Management', '10.1111/fima.12412', 'lbbsnflxz5fi8ntfbgm68'),
                sgs: art('Singh, Gaur &amp; Singh (2024), <em>Blockchain-based governance</em>, British Journal of Management', '10.1111/1467-8551.12784', 'qvxvbzkjz7fj1owldqt7z'),
                kamp: art('Kampakis (2018), <em>Three case studies in tokenomics</em>, J. British Blockchain Association', '10.31585/jbba-1-2-(7)2018', 'f2p6it10m5nagwbq4lesm'),
                dao: `Alon, Klemetsen, Šilenskytė &amp; Gildin (2025), <em>New pathways for international business governance via blockchain-based DAOs</em>, Multinational Business Review (${a('DOI', doi('10.1108/MBR-07-2024-0132'))})`,
                defi: art('Piñeiro-Chousa et al. (2022), <em>A preliminary assessment of the performance of DeFi cryptocurrencies</em>, Technological Forecasting and Social Change', '10.1016/j.techfore.2022.121740', 'ex9d6w2nlm4dlb0vigj1l'),
                lm: art('Lo &amp; Medda (2020), <em>Assets on the blockchain: an empirical study of tokenomics</em>, Information Economics and Policy', '10.1016/j.infoecopol.2020.100881', 'b5hjhd6ziz3ndzyozj0tk'),
                cGamble: a('<em>Cryptocurrencies: Investment, Money, or Gamble? (A)</em>', 'https://www.thecasecentre.org/products/view?id=169082'),
                cPolygon: a('<em>Polygon Labs: Scaling Web3 Growth with Cost per Wallet Efficiency</em>', 'https://www.iveypublishing.ca/s/product/polygon-labs-scaling-web3-growth-with-cost-per-wallet-efficiency/01tOF00000AiwsAYAR') + ' (Ivey)',
                cXrp: a('<em>The ripple effect: navigating an XRP investment</em>', 'https://www.emerald.com/tcj/article-abstract/22/1/142/1265701/The-ripple-effect-navigating-an-XRP-investment') + ' (The CASE Journal)',
                cDao: a('<em>The DAO Hack: A Blockchain Dilemma</em>', 'https://www.iveypublishing.ca/s/product/the-dao-hack-a-blockchain-dilemma/01t5c00000Cwps9AAB') + ' (Ivey)',
                cKaspa: '<em>KaspaCom: Capturing Value from the Kaspa Blockchain</em> (Ivey; course pack from the instructor)'
            };
            const rows = lang => {
                const ro = lang === 'ro';
                const C = ro ? 'Studiu de caz' : 'Case', P = ro ? 'Proiect' : 'Project';
                return [
                    [ro ? 'Luni 16 nov.' : 'Mon 16 Nov', ro ? 'Bitcoin și whitepaper-ul său: fundamentele blockchain, macroeconomia, cererea, oferta, efectele de rețea, costurile și valoarea Bitcoin' : 'Bitcoin and its whitepaper: blockchain foundations, macroeconomics, demand, supply, network effects, costs and value of Bitcoin',
                        `${R.btc} (${ro ? 'integral, înainte de curs' : 'in full, before class'}); ${R.jrz}; ${C}: ${R.cGamble}`, `${V.btcMacro}; ${V.ds}; ${V.value}`,
                        ro ? 'Formarea echipelor, alegerea proiectului, cazul de utilizare și propunerea de valoare economică' : 'Form teams, select the project, define its use case and economic value proposition'],
                    [ro ? 'Marți 17 nov.' : 'Tue 17 Nov', ro ? 'Ethereum și smart contracts: conturi, tranziții de stare, gas; aplicații descentralizate, NFT, riscuri de execuție și de securitate' : 'Ethereum and smart contracts: accounts, state transitions, gas; decentralised applications, NFTs, execution and security risks',
                        `${R.ethWp}; ${R.sgs}; ${C}: ${R.cPolygon}`, `${V.eth}; ${V.sc}`,
                        ro ? 'Arhitectura blockchain a proiectului, funcțiile smart contracts, dependențe și riscuri' : 'Map the blockchain architecture, smart-contract functions, dependencies and risks'],
                    [ro ? 'Miercuri 18 nov.' : 'Wed 18 Nov', ro ? 'Piețe financiare și tokenomics: stablecoin-uri, CBDC, portofele, custodie; oferta, deblocările, stimulentele și captarea valorii' : 'Financial markets and tokenomics: stablecoins, CBDCs, wallets, custody; supply, unlocks, incentives and value capture',
                        `${R.kamp}; ${C}: ${R.cXrp}`, `${V.cbdc}; ${V.wallets}; ${V.tokCB}; ${V.tok}`,
                        ro ? 'Tabelul ofertei și al alocării token-ului; riscurile de diluare și de custodie; scenarii bull și bear' : 'Token supply and allocation table; dilution and custody risks; bull and bear scenarios'],
                    [ro ? 'Joi 19 nov.' : 'Thu 19 Nov', ro ? 'DAO și guvernanța descentralizată: vot, controlul trezoreriei, delegare, stimulentele părților interesate; etică și sustenabilitate' : 'DAOs and decentralised governance: voting, treasury control, delegation, stakeholder incentives; ethics and sustainability',
                        `${R.dao}; ${C}: ${R.cDao}`, `${V.sc}; ${V.tok}`,
                        ro ? 'Harta guvernanței și a modelului de afaceri; securitate, răspundere și riscurile părților interesate' : 'Map governance and the business model; security, accountability and stakeholder risks'],
                    [ro ? 'Vineri 20 nov.' : 'Fri 20 Nov', ro ? 'DeFi, evaluare și lichiditate: DEX, AMM, creditare, colateral și lichidare; capitalizare, FDV, multipli, scenarii, slippage și ieșirea din poziție' : 'DeFi, valuation and liquidity: DEXs, AMMs, lending, collateral and liquidation; market cap, FDV, comparable ratios, scenarios, slippage and exit',
                        `${R.defi}; ${C}: ${R.cKaspa}`, `${V.tok}; ${V.wallets}`,
                        ro ? 'Evaluare prin comparație, scenarii bear / base / bull, lichiditate și riscul de ieșire' : 'Valuation comparables, bear / base / bull scenarios, liquidity and exit risk'],
                    [ro ? 'Sîmbătă 21 nov.' : 'Sat 21 Nov', ro ? 'Prezentările de due diligence ale echipelor (patru blocuri de 90 de minute), feedback și sinteza cursului' : 'Team due-diligence presentations (four 90-minute blocks), feedback and course synthesis',
                        `${R.lm}; ${ro ? 'whitepaper-ul sau documentația tehnică a proiectului ales' : 'the whitepaper or technical documentation of your project'}`, V.pitch,
                        ro ? 'Slide-urile finale și jurnalul surselor, pînă la 09:10' : 'Final slides and source log due at 09:10']
                ];
            };
            return { en: rows('en'), ro: rows('ro') };
        })(),

        assessment: { en: [
            { h: 'Due-diligence project (Part 1): 50%', p: [
                'Prof. Ilan Alon. Teams of 4–5 students; each team analyses a different crypto asset, protocol or blockchain venture, chosen on Monday 16 November.',
                'The question: should an informed investor or strategic partner Buy, Hold, Avoid or Watch it (Partner, Do Not Partner or Watch if there is no investable token)? Separate project quality from token investment quality.',
                'Deliverables: 10–12 slides with the eight required exhibits (project snapshot, market map, token unlock chart, value-capture diagram, valuation comparables, governance map, risk heatmap, final recommendation) and a source log, due at 09:10 on Saturday 21 November; a 10-minute boardroom-style presentation that day, also uploaded to YouTube.',
                'Four criteria, 25% each: investment thesis and crypto-economic analysis; research and analytical rigour; critical thinking and risk assessment; presentation quality and engagement. Educational exercise, not financial advice.',
                `<a href="https://www.dropbox.com/scl/fi/cobdpft0j4585rxydkawj" target="_blank" rel="noopener">Assignment and student template</a> · <a href="https://www.dropbox.com/scl/fi/lwctodc0e0navahf437ft" target="_blank" rel="noopener">Earlier due-diligence framework</a>`
            ] },
            { h: 'Exam: 50%', p: [
                'Friday 27 November 2026, 90 minutes, on this site, in the room: sign in with your ASE Google account and type the exam code shown on the screen.',
                'One exam of 56 multiple-choice questions, one point each, on both parts of the course: 28 on Crypto Economics and 28 on Blockchain Analytics, mixed together; the last 15 are about 3 short cases built on real output from the course notebooks. The score is the share of correct answers, out of 100.',
                'Every student gets a personal paper: the questions are drawn from larger banks, with several variants of each question and case, and their order and options are shuffled. No calculations; a wrong answer costs nothing.',
                'Closed book, one A4 formula sheet allowed. Answers are saved as you go; if the page closes, sign in again to resume.'
            ] },
            { h: 'Attendance and policies', p: [
                'Attendance is recorded at every lecture of both parts: sign in on this site and type the code shown in the room (it changes every minute). It does not count towards the grade, but attending every lecture is strongly recommended.',
                'AI tools may be used to study, to run the notebooks and for the project, with substantive AI assistance disclosed; they are not allowed during the exam.',
                'Each Blockchain Analytics slide deck ends with an appendix for self-study; the appendix is not examined. The practice quizzes on this site help you prepare.'
            ] }
        ], ro: [
            { h: 'Proiectul de due diligence (Partea 1): 50%', p: [
                'Prof. Ilan Alon. Echipe de 4–5 studenți; fiecare echipă analizează un alt activ cripto, protocol sau proiect blockchain, ales luni, 16 noiembrie.',
                'Întrebarea: un investitor informat sau un partener strategic ar trebui să cumpere, să păstreze, să evite sau să urmărească activul (Buy, Hold, Avoid, Watch; Partner, Do Not Partner sau Watch dacă nu există un token investibil)? Separați calitatea proiectului de calitatea token-ului ca investiție.',
                'Livrabile: 10–12 slide-uri cu cele opt exhibite cerute (fișa proiectului, harta pieței, graficul deblocărilor de token-uri, diagrama captării valorii, evaluarea prin comparație, harta guvernanței, harta riscurilor, recomandarea finală) și jurnalul surselor, pînă sîmbătă, 21 noiembrie, la 09:10; în aceeași zi, o prezentare de 10 minute, în stil boardroom, încărcată și pe YouTube.',
                'Patru criterii, fiecare de 25%: teza de investiție și analiza cripto-economică; documentarea și rigoarea analizei; gîndirea critică și evaluarea riscurilor; calitatea prezentării și implicarea publicului. Exercițiu educativ, nu sfat financiar.',
                `<a href="https://www.dropbox.com/scl/fi/cobdpft0j4585rxydkawj" target="_blank" rel="noopener">Tema și șablonul pentru studenți</a> · <a href="https://www.dropbox.com/scl/fi/lwctodc0e0navahf437ft" target="_blank" rel="noopener">Cadrul anterior de due diligence</a>`
            ] },
            { h: 'Examenul: 50%', p: [
                'Vineri, 27 noiembrie 2026, 90 de minute, pe acest site, în sală: vă autentificați cu contul Google ASE și introduceți codul de examen afișat pe ecran.',
                'Un singur examen cu 56 de întrebări grilă, fiecare de un punct, din ambele părți ale disciplinei: 28 de Crypto Economics și 28 de Blockchain Analytics, amestecate; ultimele 15 se referă la 3 studii de caz scurte, construite pe rezultate reale din notebook-urile cursului. Nota este procentul de răspunsuri corecte, din 100.',
                'Fiecare student primește un subiect personal: întrebările sînt extrase din bănci mai mari, cu mai multe variante pentru fiecare întrebare și studiu de caz, iar ordinea lor și a variantelor este amestecată. Fără calcule; un răspuns greșit nu se depunctează.',
                'Fără materiale, cu o foaie de formule A4. Răspunsurile se salvează pe parcurs; dacă pagina se închide, vă autentificați din nou și continuați.'
            ] },
            { h: 'Prezență și reguli', p: [
                'Prezența se înregistrează la fiecare curs, din ambele părți: vă autentificați pe acest site și introduceți codul afișat în sală (se schimbă în fiecare minut). Prezența nu intră în notă, dar participarea la toate cursurile este puternic recomandată.',
                'Instrumentele AI pot fi folosite pentru studiu, pentru rularea notebook-urilor și pentru proiect, cu declararea asistenței AI substanțiale; nu sînt permise la examen.',
                'Fiecare set de slide-uri Blockchain Analytics se încheie cu o anexă pentru studiu individual; anexa nu intră în examen. Quiz-urile de exersare de pe site vă ajută să vă pregătiți.'
            ] }
        ] },

        resources: [
            { icon: '&#128187;', href: REPO, en: ['GitHub Repository', 'Slides, notebooks, Quantlets and data'], ro: ['Repository GitHub', 'Slide-uri, notebook-uri, Quantlets și date'] },
            { icon: '&#127891;', img: 'logos/qr_logo.png', href: 'https://quantinar.com/coursecontent/695/blockchain', en: ['Blockchain Analytics on Quantinar', 'Video course of the same name as Part 2: 23 units with slides and recorded lectures'], ro: ['Blockchain Analytics pe Quantinar', 'Cursul video cu același nume ca Partea 2: 23 de unități cu slide-uri și prelegeri înregistrate'] },
            { icon: '&#128190;', img: 'logos/ql_logo.png', href: 'https://github.com/danpele/Blockchain-Applications/tree/main/Quantlets', en: ['Quantlets', 'One notebook for every course chart (Quantlet format)'], ro: ['Quantlets', 'Cîte un notebook pentru fiecare grafic al cursului (format Quantlet)'] },
            { icon: '&#128200;', href: 'https://thecrix.de', en: ['CRIX', 'CRypto IndeX'], ro: ['CRIX', 'CRypto IndeX'] },
            { icon: '&#127963;', img: 'logos/ida_square.png', href: 'https://theida.net', en: ['IDA', 'Institute for Digital Assets'], ro: ['IDA', 'Institute for Digital Assets'] }
        ],

        dataSources: [
            { name: 'EODHD', href: 'https://eodhd.com', en: 'Daily and hourly prices of cryptos, stablecoins, stocks, indices, FX and gold, used in the lectures and notebooks (the files are in the repository, data/)', ro: 'Prețuri zilnice și orare pentru criptoactive, stablecoin-uri, acțiuni, indici, cursuri valutare și aur, folosite în cursuri și în notebook-uri (fișierele sînt în repository, data/)' },
            { name: 'DefiLlama', href: 'https://defillama.com', en: 'Stablecoin supply and DeFi total value locked (TVL)', ro: 'Oferta de stablecoin-uri și valoarea totală blocată (TVL) în DeFi' },
            { name: 'Coin Metrics', href: 'https://coinmetrics.io/community-network-data/', en: 'On-chain activity of Bitcoin and Ethereum (community data)', ro: 'Activitatea on-chain pentru Bitcoin și Ethereum (date comunitare)' },
            { name: 'CBECI', href: 'https://ccaf.io/cbnsi/cbeci', en: 'Cambridge Bitcoin Electricity Consumption Index: mining energy and the geography of mining', ro: 'Cambridge Bitcoin Electricity Consumption Index: energia consumată de minerit și geografia mineritului' },
            { name: 'CoinGecko, Etherscan, Dune', href: 'https://www.coingecko.com', en: 'Further public sources, useful for the due-diligence project: prices and market capitalisation, Ethereum transactions, SQL queries on on-chain data', ro: 'Alte surse publice, utile pentru proiectul de due diligence: prețuri și capitalizare, tranzacții Ethereum, interogări SQL pe date on-chain' }
        ],

        bibliography: [
            'Härdle, W. K., Harvey, C. R., &amp; Reule, R. C. G. (2020). <a href="https://doi.org/10.1093/jjfinec/nbz033" target="_blank" rel="noopener">Understanding cryptocurrencies</a>. <em>Journal of Financial Econometrics</em>, 18(2), 181–208.',
            'Trimborn, S., &amp; Härdle, W. K. (2018). <a href="https://doi.org/10.1016/j.jempfin.2018.08.004" target="_blank" rel="noopener">CRIX an index for cryptocurrencies</a>. <em>Journal of Empirical Finance</em>, 49, 107–122.',
            'Pele, D. T., Wesselhöfft, N., Härdle, W. K., Kolossiatis, M., &amp; Yatracos, Y. G. (2023). <a href="https://doi.org/10.1080/1351847X.2021.1960403" target="_blank" rel="noopener">Are cryptos becoming alternative assets?</a> <em>The European Journal of Finance</em>, 29(10), 1064–1105.',
            'Lyons, R. K., &amp; Viswanath-Natraj, G. (2023). <a href="https://doi.org/10.1016/j.jimonfin.2022.102777" target="_blank" rel="noopener">What keeps stablecoins stable?</a> <em>Journal of International Money and Finance</em>, 131, 102777.'
        ],

        contact: {
            name: 'Prof. dr. Daniel Traian Pele',
            email: 'danpele@ase.ro',
            en: ['Bucharest University of Economic Studies', 'Department of Statistics and Econometrics'],
            ro: ['Academia de Studii Economice din București', 'Departamentul de Statistică și Econometrie'],
            seminar: { name: 'Prof. Ilan Alon', email: 'ilan.alon@uni-corvinus.hu' }
        },

        footerLogos: [
            ['https://www.ase.ro', 'logos/ase_logo.png', 'ASE'],
            ['https://www.theida.net/', 'logos/ida_logo.png', 'IDA'],
            ['https://quantinar.com', 'logos/qr_logo.png', 'Quantinar'],
            ['https://quantlet.com', 'logos/ql_logo.png', 'Quantlet'],
            ['https://blockchain-research-center.com/', 'logos/brc_logo.png', 'Blockchain Research Center']
        ],

        quizzes: {}
    };
})();
