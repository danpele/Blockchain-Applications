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
                heroTag: 'The course has two parts. In Crypto Economics (16–21 November), Prof. Ilan Alon covers Bitcoin, Ethereum, tokenomics, DAOs and DeFi through business cases, and students analyse a crypto project in teams. In Blockchain Analytics (23–26 November), Prof. Daniel Traian Pele covers the statistics of crypto markets: returns, volatility and tail risk, stablecoin depegs, networks and machine-learning forecasts, with a Colab notebook for each lecture.',
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
                seminarIntro: 'Prof. Ilan Alon examines blockchain, crypto economics and business strategy through five cases and a due-diligence project. Weekdays 17:30–19:00 and 19:10–20:40; the last hour of each weekday (19:40–20:40) is guided project work, with the instructor advising each team. Saturday 21 November, 09:10–15:40, is reserved for the team presentations in the classroom: 20 minutes per team plus 10 minutes of questions. Prepare the reading, case or whitepaper before each day. The five cases are provided as PDF copies for enrolled students: open them with your ASE Google account. Part 2 builds on these sessions and does not repeat them.',
                assessmentTitle: 'Assessment',
                colSession: 'Day', colTopic: 'Focus', colPrep: 'Readings and case', colVideo: 'Videos', colProj: 'Project hour',
                resources: 'Resources',
                bibliography: 'Core texts (Part 2)',
                dataSources: 'Data sources',
                contact: 'Contact',
                instructor: 'Part 2: Blockchain Analytics and the exam',
                seminarCard: 'Part 1: Crypto Economics and the project',
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
                heroTag: 'Cursul are două părți. În Crypto Economics (16–21 noiembrie), prof. Ilan Alon tratează Bitcoin, Ethereum, tokenomics, DAO și DeFi prin studii de caz, iar studenții analizează în echipă un proiect cripto. În Blockchain Analytics (23–26 noiembrie), prof. Daniel Traian Pele tratează statistica piețelor cripto: randamente, volatilitate și tail risk, depeg-ul stablecoin-urilor, rețele și prognoze cu machine learning, cu un notebook Colab pentru fiecare curs.',
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
                seminarIntro: 'Prof. Ilan Alon analizează tehnologia blockchain, economia cripto și strategia de afaceri prin cinci studii de caz și un proiect de due diligence. În zilele lucrătoare 17:30–19:00 și 19:10–20:40; ultima oră din fiecare zi (19:40–20:40) este lucru ghidat la proiect, cu profesorul care consiliază fiecare echipă. Sîmbăta, 21 noiembrie, 09:10–15:40, este rezervată prezentărilor echipelor, în sala de curs: 20 de minute pentru fiecare echipă și 10 minute de întrebări. Pregătiți lectura, studiul de caz sau whitepaper-ul înaintea fiecărei zile. Cele cinci studii de caz sînt disponibile în PDF pentru studenții înscriși: deschideți-le cu contul Google ASE. Partea 2 pornește de la aceste întîlniri și nu le repetă.',
                assessmentTitle: 'Evaluare',
                colSession: 'Ziua', colTopic: 'Tema', colPrep: 'Lecturi și studiu de caz', colVideo: 'Videoclipuri', colProj: 'Ora de proiect',
                resources: 'Resurse',
                bibliography: 'Texte de bază (Partea 2)',
                dataSources: 'Surse de date',
                contact: 'Contact',
                instructor: 'Partea 2: Blockchain Analytics și examenul',
                seminarCard: 'Partea 1: Crypto Economics și proiectul',
                seminarRole: 'Ariel University și Corvinus University of Budapest',
                office: 'Întrebări',
                officeText: 'Pe e-mail sau înainte și după curs',
                close: 'Închide',
                footer: 'Blockchain Applications | Masterul Blockchain for Business | Academia de Studii Economice din București'
            }
        },

        overview: {
            en: [
                { h: 'Programme', p: ['Master Blockchain for Business (MBB), year I, semester I, 2026–2027', 'Taught in English; one course in two parts', '<a href="EN/Blockchain_Applications_Syllabus_2026-2027.pdf" target="_blank" rel="noopener">Course syllabus (PDF)</a>'] },
                { h: 'Part 1: Crypto Economics', p: ['Prof. Ilan Alon, Mon 16 – Sat 21 November 2026', 'Weekdays 17:30–20:40, Saturday 09:10–15:40 (28 academic hours)', 'Room 4113, 1st floor (Trading Lab), Victor Slăvescu Building, 2–2A Calea Griviței, District 1, Bucharest'] },
                { h: 'Part 2: Blockchain Analytics', p: ['Prof. Daniel Traian Pele, 7 lectures', 'Mon 23 Nov (L1–L2), Tue 24 Nov (L3–L4), Wed 25 Nov (L5–L6), Thu 26 Nov (L7)', 'Room 4113, 1st floor (Trading Lab), Victor Slăvescu Building, 2–2A Calea Griviței, District 1, Bucharest'] },
                { h: 'Guest lecture, Tue 24 Nov', p: ['<strong>Crypto-assets and stablecoins: adoption, holdings and implications for financial stability – from global trends to Romania</strong>', 'Alex-Mihai Sima, National Bank of Romania (NBR), Financial Stability Department', '<details class="guest-bio"><summary>About the speaker</summary>Alex-Mihai Sima is a second-year PhD student at the Doctoral School of International Business and Economics, Bucharest University of Economic Studies (ASE), and works in the Financial Stability Department of the National Bank of Romania (NBR), on systemic risk monitoring. His work covers the authorisation of issuers of e-money tokens (EMTs) under the EU Markets in Crypto-Assets Regulation (MiCAR), the digital euro, and cyber and AI-related risks. His doctoral research studies how new technologies are reshaping the architecture of the global financial system; his paper “<a href="https://doi.org/10.2478/picbe-2026-0052" target="_blank" rel="noopener">Integrating Crypto-Market Proxies as Financial Stability Drivers: A Random Forest Approach</a>” was presented at the International Conference on Business Excellence 2026.</details>'] },
                { h: 'Exam', p: ['Friday 27 November 2026, 60 minutes', '30 multiple-choice questions on both parts of the course, answered on this website'] },
                { h: 'Final grade', p: ['50% due-diligence project (Part 1)', '50% exam (both parts, one paper)'] },
                { h: 'Tools', p: ['Google Colab notebooks in Python, run in the browser', 'Sign-in with the ASE Google account for attendance and the exam'] }
            ],
            ro: [
                { h: 'Program', p: ['Masterul Blockchain for Business (MBB), anul I, semestrul I, 2026–2027', 'Predare în limba engleză; o disciplină în două părți', '<a href="EN/Blockchain_Applications_Syllabus_2026-2027.pdf" target="_blank" rel="noopener">Syllabus (PDF, în engleză)</a>'] },
                { h: 'Partea 1: Crypto Economics', p: ['Prof. Ilan Alon, luni 16 – sîmbătă 21 noiembrie 2026', 'În zilele lucrătoare 17:30–20:40, sîmbătă 09:10–15:40 (28 de ore academice)', 'Sala 4113, etajul 1 (Trading Lab), clădirea Victor Slăvescu, Calea Griviței 2–2A, Sector 1, București'] },
                { h: 'Partea 2: Blockchain Analytics', p: ['Prof. Daniel Traian Pele, 7 cursuri', 'Luni 23 nov. (C1–C2), marți 24 nov. (C3–C4), miercuri 25 nov. (C5–C6), joi 26 nov. (C7)', 'Sala 4113, etajul 1 (Trading Lab), clădirea Victor Slăvescu, Calea Griviței 2–2A, Sector 1, București'] },
                { h: 'Prelegere invitată, marți 24 nov.', p: ['<strong>Crypto-assets and stablecoins: adoption, holdings and implications for financial stability – from global trends to Romania</strong>', 'Alex-Mihai Sima, Banca Națională a României (BNR), Direcția Stabilitate Financiară', '<details class="guest-bio"><summary>Despre invitat</summary>Alex-Mihai Sima este doctorand în anul al II-lea la Școala Doctorală Economie și Afaceri Internaționale a Academiei de Studii Economice din București (ASE) și lucrează în Direcția Stabilitate Financiară a Băncii Naționale a României (BNR), în monitorizarea riscului sistemic. Se ocupă de autorizarea emitenților de token-uri de monedă electronică (EMT) conform Regulamentului UE privind piețele criptoactivelor (MiCAR), de euro digital și de riscurile cibernetice și cele legate de AI. Cercetarea sa doctorală studiază felul în care noile tehnologii schimbă arhitectura sistemului financiar global; lucrarea sa „<a href="https://doi.org/10.2478/picbe-2026-0052" target="_blank" rel="noopener">Integrating Crypto-Market Proxies as Financial Stability Drivers: A Random Forest Approach</a>” a fost prezentată la International Conference on Business Excellence 2026.</details>'] },
                { h: 'Examen', p: ['Vineri, 27 noiembrie 2026, 60 de minute', '30 de întrebări grilă din ambele părți ale cursului, cu răspunsurile date pe acest site'] },
                { h: 'Nota finală', p: ['50% proiectul de due diligence (Partea 1)', '50% examenul (ambele părți, un singur subiect)'] },
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
                guest: { en: { h: 'Guest lecture', t: 'Crypto-assets and stablecoins: adoption, holdings and implications for financial stability – from global trends to Romania', who: 'Alex-Mihai Sima, National Bank of Romania (NBR)' }, ro: { h: 'Prelegere invitată', t: 'Crypto-assets and stablecoins: adoption, holdings and implications for financial stability – from global trends to Romania', who: 'Alex-Mihai Sima, Banca Națională a României (BNR)' } },
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

        // Part 1 project: categories and candidate coins (Prof. Ilan Alon); each team takes a different category and one coin from it
        projectCategories: {
            en: { h: 'Project categories and candidate coins', intro: 'The class works in five teams of four students. Each team investigates a different category and one cryptocurrency from it: no two teams share a category or a coin. The last column suggests a useful due-diligence comparison within the category.', cols: ['Category', 'Candidate coins', 'A useful due-diligence comparison'], rows: [
                ['AI', 'Bittensor (TAO), Render (RENDER), Artificial Superintelligence Alliance (FET), Virtuals Protocol (VIRTUAL), Pearl Research (PRL), Perle Labs (PRL)', 'Compare AI service markets, GPU compute and expert data work. Test whether there are paying customers, how work quality is verified, whether token demand follows real usage and whether emissions overwhelm demand. Bittensor’s subnet incentives, Render’s burn-and-credit model and Pearl’s proposed proof of useful work are quite different token-economy cases (<a href="https://www.bittensor.com" target="_blank" rel="noopener">bittensor.com</a>).'],
                ['Gaming and game assets', 'Sui (SUI), Solana (SOL), Aptos (APT), Immutable (IMX), Ronin (RON), Axie Infinity (AXS)', 'Compare general-purpose platforms with networks built around game distribution and assets. Ask whether games retain active players, whether on-chain items improve the player experience and whether activity creates value for the network token. Sui, Ronin and Immutable all provide game-development infrastructure, but their tokens have different roles (<a href="https://docs.sui.io" target="_blank" rel="noopener">docs.sui.io</a>).'],
                ['Decentralized storage and cloud infrastructure', 'Filecoin (FIL), Internet Computer (ICP), BitTorrent (BTT), Arweave (AR), Akash (AKT)', 'Compare persistent storage, web infrastructure and decentralized cloud markets. Test paid demand, retrieval performance, provider concentration, customer retention and whether token rewards are needed to make the service economical. Filecoin, for example, uses storage deals and provider collateral (<a href="https://docs.filecoin.io" target="_blank" rel="noopener">docs.filecoin.io</a>).'],
                ['DeFi lending and decentralized exchanges', 'Aave (AAVE), Morpho (MORPHO), Uniswap (UNI), Curve (CRV), Aerodrome (AERO), PancakeSwap (CAKE)', 'Compare lending markets with token-swapping venues. Investigate who bears smart-contract and collateral risk, how the protocol attracts liquidity and whether fees or governance rights create value for token holders.'],
                ['On-chain trading and derivatives', 'Hyperliquid (HYPE), Injective (INJ), Jupiter (JUP), dYdX (DYDX)', 'Compare an on-chain derivatives venue, a trading-focused chain and a trading aggregator. Examine volume quality, fee distribution, leverage and liquidation risks, token unlocks and how much activity depends on incentives. Hyperliquid’s published fee mechanics make it a useful case for tracing protocol fees to token value capture (<a href="https://hyperliquid.gitbook.io" target="_blank" rel="noopener">hyperliquid.gitbook.io</a>).'],
                ['Tokenized real-world assets and commodities', 'Ondo (ONDO), PAX Gold (PAXG), Tether Gold (XAUt), Centrifuge (CFG), Maple (SYRUP)', 'Compare tokenized securities, gold-linked tokens and on-chain credit. Ask what legal rights token holders actually have, how redemption works, who holds the underlying assets and whether the project token captures value from the products. Ondo’s own terms distinguish its tokens from the underlying securities (<a href="https://app.ondo.finance" target="_blank" rel="noopener">app.ondo.finance</a>).'],
                ['Privacy and confidential transactions', 'Monero (XMR), Zcash (ZEC), Dash (DASH)', 'Compare privacy by default with optional privacy features. Examine the cryptographic design, usability, auditability, exchange access and regulatory exposure.'],
                ['Oracles and interoperability', 'Chainlink (LINK), Pyth Network (PYTH), LayerZero (ZRO), Quant (QNT), Flare (FLR)', 'Compare data feeds with cross-chain messaging and interoperability. Test security assumptions, integration concentration, actual fees and what happens when an oracle or bridge fails.'],
                ['Payments and monetary networks', 'Bitcoin (BTC), XRP (XRP), Stellar (XLM), Litecoin (LTC), Bitcoin Cash (BCH), Kaspa (KAS)', 'Compare monetary design, payment use, consensus and security budgets. Kaspa adds a different blockDAG approach, so you can test technical claims against security and adoption evidence (<a href="https://wiki.kaspa.org" target="_blank" rel="noopener">wiki.kaspa.org</a>).'],
                ['Exchange-linked tokens', 'BNB (BNB), Cronos (CRO), OKB (OKB), KuCoin Token (KCS), GateToken (GT), Bitget Token (BGB)', 'Compare tokens linked to centralized exchange businesses. Examine the token’s enforceable utility, dependence on the exchange, transparency, related-party risks and what happens to holders if the business faces regulatory or operational trouble.'],
                ['Meme and community-driven assets', 'Dogecoin (DOGE), Shiba Inu (SHIB), Pepe (PEPE), Pudgy Penguins (PENGU), OFFICIAL TRUMP (TRUMP)', 'Use these to analyze attention, community, distribution and speculative demand. Ask what, if anything, supports ongoing value beyond brand recognition and trading interest.']
            ] },
            ro: { h: 'Categoriile proiectului și monedele candidate', intro: 'Studenții lucrează în cinci echipe de cîte patru. Fiecare echipă analizează o altă categorie și o singură criptomonedă din ea: două echipe nu pot avea aceeași categorie sau aceeași monedă. Ultima coloană sugerează o comparație utilă pentru due diligence în cadrul categoriei.', cols: ['Categoria', 'Monede candidate', 'O comparație utilă pentru due diligence'], rows: [
                ['AI', 'Bittensor (TAO), Render (RENDER), Artificial Superintelligence Alliance (FET), Virtuals Protocol (VIRTUAL), Pearl Research (PRL), Perle Labs (PRL)', 'Comparați piețele de servicii AI, puterea de calcul GPU și munca de experți pe date. Verificați dacă există clienți care plătesc, cum se verifică calitatea muncii, dacă cererea de token urmează utilizarea reală și dacă emisiunea de token-uri depășește cererea. Stimulentele pe subrețele ale Bittensor, modelul burn-and-credit al Render și proof of useful work propus de Pearl sînt cazuri foarte diferite de economie a token-ului (<a href="https://www.bittensor.com" target="_blank" rel="noopener">bittensor.com</a>).'],
                ['Gaming și active din jocuri', 'Sui (SUI), Solana (SOL), Aptos (APT), Immutable (IMX), Ronin (RON), Axie Infinity (AXS)', 'Comparați platformele de uz general cu rețelele construite în jurul distribuției de jocuri și al activelor din jocuri. Întrebați-vă dacă jocurile își păstrează jucătorii activi, dacă obiectele on-chain îmbunătățesc experiența jucătorului și dacă activitatea creează valoare pentru token-ul rețelei. Sui, Ronin și Immutable oferă toate infrastructură pentru dezvoltarea de jocuri, dar token-urile lor au roluri diferite (<a href="https://docs.sui.io" target="_blank" rel="noopener">docs.sui.io</a>).'],
                ['Stocare descentralizată și infrastructură cloud', 'Filecoin (FIL), Internet Computer (ICP), BitTorrent (BTT), Arweave (AR), Akash (AKT)', 'Comparați stocarea persistentă, infrastructura web și piețele de cloud descentralizat. Verificați cererea plătită, performanța la recuperarea datelor, concentrarea furnizorilor, păstrarea clienților și dacă recompensele în token-uri sînt necesare ca serviciul să fie rentabil. Filecoin, de exemplu, folosește contracte de stocare și garanții depuse de furnizori (<a href="https://docs.filecoin.io" target="_blank" rel="noopener">docs.filecoin.io</a>).'],
                ['Creditare DeFi și exchange-uri descentralizate', 'Aave (AAVE), Morpho (MORPHO), Uniswap (UNI), Curve (CRV), Aerodrome (AERO), PancakeSwap (CAKE)', 'Comparați piețele de creditare cu platformele de schimb de token-uri. Analizați cine poartă riscul de smart contract și riscul garanțiilor, cum atrage protocolul lichiditate și dacă comisioanele sau drepturile de guvernanță creează valoare pentru deținătorii de token-uri.'],
                ['Tranzacționare on-chain și derivate', 'Hyperliquid (HYPE), Injective (INJ), Jupiter (JUP), dYdX (DYDX)', 'Comparați o platformă on-chain de derivate, un blockchain dedicat tranzacționării și un agregator de tranzacționare. Analizați calitatea volumului, distribuirea comisioanelor, riscurile de levier și de lichidare, deblocările de token-uri și cît din activitate depinde de stimulente. Mecanismul de comisioane publicat de Hyperliquid îl face un caz util pentru a urmări drumul de la comisioanele protocolului la valoarea captată de token (<a href="https://hyperliquid.gitbook.io" target="_blank" rel="noopener">hyperliquid.gitbook.io</a>).'],
                ['Active reale și mărfuri tokenizate', 'Ondo (ONDO), PAX Gold (PAXG), Tether Gold (XAUt), Centrifuge (CFG), Maple (SYRUP)', 'Comparați titlurile de valoare tokenizate, token-urile legate de aur și creditarea on-chain. Întrebați-vă ce drepturi legale au de fapt deținătorii de token-uri, cum funcționează răscumpărarea, cine deține activele-suport și dacă token-ul proiectului captează valoare din produse. Chiar termenii Ondo își deosebesc token-urile de titlurile de valoare-suport (<a href="https://app.ondo.finance" target="_blank" rel="noopener">app.ondo.finance</a>).'],
                ['Confidențialitate și tranzacții confidențiale', 'Monero (XMR), Zcash (ZEC), Dash (DASH)', 'Comparați confidențialitatea implicită cu funcțiile opționale de confidențialitate. Analizați designul criptografic, ușurința de folosire, auditabilitatea, accesul pe exchange-uri și expunerea la reglementare.'],
                ['Oracole și interoperabilitate', 'Chainlink (LINK), Pyth Network (PYTH), LayerZero (ZRO), Quant (QNT), Flare (FLR)', 'Comparați fluxurile de date cu mesageria cross-chain și interoperabilitatea. Verificați ipotezele de securitate, concentrarea integrărilor, comisioanele efective și ce se întîmplă cînd un oracol sau un bridge cedează.'],
                ['Plăți și rețele monetare', 'Bitcoin (BTC), XRP (XRP), Stellar (XLM), Litecoin (LTC), Bitcoin Cash (BCH), Kaspa (KAS)', 'Comparați designul monetar, folosirea la plăți, consensul și bugetele de securitate. Kaspa aduce o abordare diferită, de tip blockDAG, așa că puteți confrunta afirmațiile tehnice cu dovezile despre securitate și adopție (<a href="https://wiki.kaspa.org" target="_blank" rel="noopener">wiki.kaspa.org</a>).'],
                ['Token-uri legate de exchange-uri', 'BNB (BNB), Cronos (CRO), OKB (OKB), KuCoin Token (KCS), GateToken (GT), Bitget Token (BGB)', 'Comparați token-urile legate de afaceri cu exchange-uri centralizate. Analizați utilitatea token-ului care poate fi cerută efectiv, dependența de exchange, transparența, riscurile legate de părți afiliate și ce se întîmplă cu deținătorii dacă afacerea are probleme de reglementare sau operaționale.'],
                ['Meme coins și active bazate pe comunitate', 'Dogecoin (DOGE), Shiba Inu (SHIB), Pepe (PEPE), Pudgy Penguins (PENGU), OFFICIAL TRUMP (TRUMP)', 'Folosiți-le pentru a analiza atenția, comunitatea, distribuția și cererea speculativă. Întrebați-vă ce susține, dacă ceva susține, valoarea în timp, dincolo de notorietatea mărcii și interesul pentru tranzacționare.']
            ] }
        },

        seminars: (function () {
            const a = (t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
            const doi = d => 'https://doi.org/' + d;
            const drv = id => 'https://drive.google.com/file/d/' + id + '/view';
            const ase = t => `${t} <span class="note">(PDF copy for enrolled students: sign in with your ASE Google account)</span>`;
            const pdf = f => 'pdfjs/web/viewer.html?file=' + encodeURIComponent('../../EN/Readings/' + f);
            const oa = (t, d, f) => `${t} (${a('DOI', doi(d))}, ${a('PDF', pdf(f))})`;
            const art = (t, d, id) => `${t} (${a('DOI', doi(d))}, ${a('PDF', drv(id))}<span class="note">, ASE Google account</span>)`;
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
                jrz: art('Jiang, Rodríguez &amp; Zhang (2023), <em>Macroeconomic fundamentals and cryptocurrency prices</em>, Financial Management', '10.1111/fima.12412', '1Q7AOcjBdZD_pqjoE6tCr-gp_SY4ipH4a'),
                sgs: oa('Singh, Gaur &amp; Singh (2024), <em>Blockchain-based governance</em>, British Journal of Management', '10.1111/1467-8551.12784', 'Singh_Gaur_Singh_2024_Blockchain_Governance.pdf'),
                kamp: oa('Kampakis (2018), <em>Three case studies in tokenomics</em>, J. British Blockchain Association', '10.31585/jbba-1-2-(7)2018', 'Kampakis_2018_Tokenomics_Case_Studies.pdf'),
                dao: `Alon, Klemetsen, Šilenskytė &amp; Gildin (2025), <em>New pathways for international business governance via blockchain-based DAOs</em>, Multinational Business Review (${a('DOI', doi('10.1108/MBR-07-2024-0132'))})`,
                defi: oa('Piñeiro-Chousa et al. (2022), <em>A preliminary assessment of the performance of DeFi cryptocurrencies</em>, Technological Forecasting and Social Change', '10.1016/j.techfore.2022.121740', 'Pineiro-Chousa_2022_DeFi_Cryptocurrencies.pdf'),
                lm: art('Lo &amp; Medda (2020), <em>Assets on the blockchain: an empirical study of tokenomics</em>, Information Economics and Policy', '10.1016/j.infoecopol.2020.100881', '1iLrGQs71np3NS9A_Pj0gZ2SEI6RuT4q7'),
                cGamble: ase(a('<em>Cryptocurrencies: Investment, Money, or Gamble? (A)</em>', drv('1Z9gx5UtoMZp7zffS3u4EZNrRTHI8oDQT'))),
                cPolygon: ase(a('<em>Polygon Labs: Scaling Web3 Growth with Cost per Wallet Efficiency</em>', drv('1emciQ971OCZ7N3cV12160Rej7XKUraGf')) + ' (Ivey)'),
                cXrp: ase(a('<em>The ripple effect: navigating an XRP investment</em>', drv('11ZFyO_1J-EKncA-lYN5l2vNwCRHl_3jo')) + ' (The CASE Journal)'),
                cDao: ase(a('<em>The DAO Hack: A Blockchain Dilemma</em>', drv('1OyQlijq6Oh4P7MZ6MyUW4Mpbx02nQUwU')) + ' (Ivey)'),
                cKaspa: ase(a('<em>KaspaCom: Capturing Value from the Kaspa Blockchain</em>', drv('1LJ2OeMqMzwmeTo6Eey7FxHhMP_od9mEU')) + ' (Ivey)')
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
                    [ro ? 'Sîmbătă 21 nov.' : 'Sat 21 Nov', ro ? 'Prezentările de due diligence ale echipelor, în sala de curs: 20 de minute și 10 minute de întrebări pentru fiecare echipă (patru blocuri de 90 de minute); feedback și sinteza cursului' : 'Team due-diligence presentations in the classroom: 20 minutes plus 10 minutes of questions per team (four 90-minute blocks); feedback and course synthesis',
                        `${R.lm}; ${ro ? 'whitepaper-ul sau documentația tehnică a proiectului ales' : 'the whitepaper or technical documentation of your project'}`, V.pitch,
                        '–']
                ];
            };
            return { en: rows('en'), ro: rows('ro') };
        })(),

        assessment: { en: [
            { h: 'Due-diligence project (Part 1): 50%', p: [
                'Prof. Ilan Alon. Five teams of four students; each team takes a different category from the list under Part 1 and one cryptocurrency from it, so no two teams share a category or a coin. Chosen on Monday 16 November.',
                'The question: should an informed investor or strategic partner Buy, Hold, Avoid or Watch it (Partner, Do Not Partner or Watch if there is no investable token)? Separate project quality from token investment quality.',
                'Deliverables: 10–12 slides with the eight required exhibits (project snapshot, market map, token unlock chart, value-capture diagram, valuation comparables, governance map, risk heatmap, final recommendation) and a source log; a 20-minute boardroom-style presentation in the classroom on Saturday 21 November, followed by 10 minutes of questions; the presentation is also uploaded to YouTube.',
                'Four criteria, 25% each: investment thesis and crypto-economic analysis; research and analytical rigour; critical thinking and risk assessment; presentation quality and engagement. Educational exercise, not financial advice.',
                `<a href="pdfjs/web/viewer.html?file=..%2F..%2FEN%2FReadings%2FCrypto_Due_Diligence_Assignment.pdf" target="_blank" rel="noopener">Assignment and student template</a> (<a href="EN/Readings/Crypto_Due_Diligence_Assignment.docx">Word</a>)`
            ] },
            { h: 'Exam: 50%', p: [
                'Friday 27 November 2026, 60 minutes, on this site: sign in with your ASE Google account and type the exam code shown on the screen.',
                'One exam of 30 multiple-choice questions, one point each: 15 on Crypto Economics and 15 on Blockchain Analytics, mixed together. The last 5 questions are about a short case built on real output from the course notebooks. The score is the share of correct answers, out of 100.',
                'Each student gets a different set of questions on the screen, drawn from larger question banks, in a different order. No calculations; a wrong answer costs nothing.',
                'No books, notes or other materials. Answers are saved as you go; if the page closes, sign in again to continue.',
                'Practice exam (Blockchain Analytics, 35 questions): <a href="EN/Exam/practice_exam.pdf" target="_blank" rel="noopener">questions</a> · <a href="EN/Exam/practice_exam_solutions.pdf" target="_blank" rel="noopener">with solutions</a>'
            ] },
            { h: 'Attendance and policies', p: [
                'Attendance is taken at every lecture of both parts with a QR code shown on the screen. It does not count towards the grade, but attending every lecture is strongly recommended.',
                'AI tools may be used to study, to run the notebooks and for the project, with substantive AI assistance disclosed; they are not allowed during the exam.',
                'Each Blockchain Analytics slide deck ends with an appendix for self-study. The practice quizzes on this site help you prepare.'
            ] }
        ], ro: [
            { h: 'Proiectul de due diligence (Partea 1): 50%', p: [
                'Prof. Ilan Alon. Cinci echipe de cîte patru studenți; fiecare echipă alege o altă categorie din lista de la Partea 1 și o singură criptomonedă din ea, astfel încît două echipe să nu aibă aceeași categorie sau aceeași monedă. Alegerea se face luni, 16 noiembrie.',
                'Întrebarea: un investitor informat sau un partener strategic ar trebui să cumpere, să păstreze, să evite sau să urmărească activul (Buy, Hold, Avoid, Watch; Partner, Do Not Partner sau Watch dacă nu există un token investibil)? Separați calitatea proiectului de calitatea token-ului ca investiție.',
                'Livrabile: 10–12 slide-uri cu cele opt exhibite cerute (fișa proiectului, harta pieței, graficul deblocărilor de token-uri, diagrama captării valorii, evaluarea prin comparație, harta guvernanței, harta riscurilor, recomandarea finală) și jurnalul surselor; o prezentare de 20 de minute, în stil boardroom, în sala de curs, sîmbătă, 21 noiembrie, urmată de 10 minute de întrebări; prezentarea se încarcă și pe YouTube.',
                'Patru criterii, fiecare de 25%: teza de investiție și analiza cripto-economică; documentarea și rigoarea analizei; gîndirea critică și evaluarea riscurilor; calitatea prezentării și implicarea publicului. Exercițiu educativ, nu sfat financiar.',
                `<a href="pdfjs/web/viewer.html?file=..%2F..%2FEN%2FReadings%2FCrypto_Due_Diligence_Assignment.pdf" target="_blank" rel="noopener">Tema și șablonul pentru studenți</a> (<a href="EN/Readings/Crypto_Due_Diligence_Assignment.docx">Word</a>)`
            ] },
            { h: 'Examenul: 50%', p: [
                'Vineri, 27 noiembrie 2026, 60 de minute, pe acest site: vă autentificați cu contul Google ASE și introduceți codul de examen afișat pe ecran.',
                'Un singur examen cu 30 de întrebări grilă, fiecare de un punct: 15 de Crypto Economics și 15 de Blockchain Analytics, amestecate. Ultimele 5 întrebări se referă la un studiu de caz scurt, construit pe rezultate reale din notebook-urile cursului. Nota este procentul de răspunsuri corecte, din 100.',
                'Fiecare student primește pe ecran alt set de întrebări, extrase din bănci mai mari de întrebări, în altă ordine. Fără calcule; un răspuns greșit nu se depunctează.',
                'Fără cărți, notițe sau alte materiale. Răspunsurile se salvează pe parcurs; dacă pagina se închide, vă autentificați din nou și continuați.',
                'Examen de exersare (Blockchain Analytics, 35 de întrebări, în engleză): <a href="EN/Exam/practice_exam.pdf" target="_blank" rel="noopener">întrebările</a> · <a href="EN/Exam/practice_exam_solutions.pdf" target="_blank" rel="noopener">cu rezolvări</a>'
            ] },
            { h: 'Prezență și reguli', p: [
                'Prezența se ia la fiecare curs, din ambele părți, cu un cod QR afișat pe ecran. Prezența nu intră în notă, dar participarea la toate cursurile este puternic recomandată.',
                'Instrumentele AI pot fi folosite pentru studiu, pentru rularea notebook-urilor și pentru proiect, cu declararea asistenței AI substanțiale; nu sînt permise la examen.',
                'Fiecare set de slide-uri Blockchain Analytics se încheie cu o anexă pentru studiu individual. Quiz-urile de exersare de pe site vă ajută să vă pregătiți.'
            ] }
        ] },

        resources: [
            { icon: '&#128196;', href: 'EN/Blockchain_Applications_Syllabus_2026-2027.pdf', en: ['Course syllabus', 'Both parts, schedule, assessment and readings (PDF)'], ro: ['Syllabus', 'Ambele părți, programul, evaluarea și lecturile (PDF, în engleză)'] },
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
            'Bailey, D. H., &amp; López de Prado, M. (2014). <a href="https://doi.org/10.3905/jpm.2014.40.5.094" target="_blank" rel="noopener">The deflated Sharpe ratio: correcting for selection bias, backtest overfitting, and non-normality</a>. <em>The Journal of Portfolio Management</em>, 40(5), 94–107.',
            'Bollerslev, T. (1986). <a href="https://doi.org/10.1016/0304-4076(86)90063-1" target="_blank" rel="noopener">Generalized autoregressive conditional heteroskedasticity</a>. <em>Journal of Econometrics</em>, 31(3), 307–327.',
            'Christoffersen, P. F. (1998). <a href="https://doi.org/10.2307/2527341" target="_blank" rel="noopener">Evaluating interval forecasts</a>. <em>International Economic Review</em>, 39(4), 841–862.',
            'Diebold, F. X., &amp; Yilmaz, K. (2012). <a href="https://doi.org/10.1016/j.ijforecast.2011.02.006" target="_blank" rel="noopener">Better to give than to receive: predictive directional measurement of volatility spillovers</a>. <em>International Journal of Forecasting</em>, 28(1), 57–66.',
            'Gneiting, T., &amp; Resin, J. (2023). <a href="https://doi.org/10.1214/23-EJS2180" target="_blank" rel="noopener">Regression diagnostics meets forecast evaluation: conditional calibration, reliability diagrams, and coefficient of determination</a>. <em>Electronic Journal of Statistics</em>, 17(2), 3226–3286.',
            'Härdle, W. K., Harvey, C. R., &amp; Reule, R. C. G. (2020). <a href="https://doi.org/10.1093/jjfinec/nbz033" target="_blank" rel="noopener">Understanding cryptocurrencies</a>. <em>Journal of Financial Econometrics</em>, 18(2), 181–208.',
            'Koenker, R., &amp; Bassett, G. (1978). <a href="https://doi.org/10.2307/1913643" target="_blank" rel="noopener">Regression quantiles</a>. <em>Econometrica</em>, 46(1), 33–50.',
            'Lyons, R. K., &amp; Viswanath-Natraj, G. (2023). <a href="https://doi.org/10.1016/j.jimonfin.2022.102777" target="_blank" rel="noopener">What keeps stablecoins stable?</a> <em>Journal of International Money and Finance</em>, 131, 102777.',
            'Makarov, I., &amp; Schoar, A. (2020). <a href="https://doi.org/10.1016/j.jfineco.2019.07.001" target="_blank" rel="noopener">Trading and arbitrage in cryptocurrency markets</a>. <em>Journal of Financial Economics</em>, 135(2), 293–319.',
            'Pele, D. T., Wesselhöfft, N., Härdle, W. K., Kolossiatis, M., &amp; Yatracos, Y. G. (2023). <a href="https://doi.org/10.1080/1351847X.2021.1960403" target="_blank" rel="noopener">Are cryptos becoming alternative assets?</a> <em>The European Journal of Finance</em>, 29(10), 1064–1105.',
            'Trimborn, S., &amp; Härdle, W. K. (2018). <a href="https://doi.org/10.1016/j.jempfin.2018.08.004" target="_blank" rel="noopener">CRIX an index for cryptocurrencies</a>. <em>Journal of Empirical Finance</em>, 49, 107–122.',
            'Urquhart, A. (2016). <a href="https://doi.org/10.1016/j.econlet.2016.09.019" target="_blank" rel="noopener">The inefficiency of Bitcoin</a>. <em>Economics Letters</em>, 148, 80–82.',
            'Zouari, M., Alon, I., &amp; Shtudiner, Z. (2026). <a href="https://doi.org/10.1016/j.jeconbus.2026.106344" target="_blank" rel="noopener">How fast can a run be? Crisis speed across stablecoins, banks, and money market funds</a>. <em>Journal of Economics and Business</em>, 106344 (open access).'
        ],

        contact: {
            name: 'Prof. dr. Daniel Traian Pele',
            email: 'danpele@ase.ro',
            en: ['Bucharest University of Economic Studies', 'Department of Statistics and Econometrics', 'Romanian Academy, Institute for Economic Forecasting'],
            ro: ['Academia de Studii Economice din București', 'Departamentul de Statistică și Econometrie', 'Academia Română, Institutul de Prognoză Economică'],
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
