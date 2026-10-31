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
    const QL_READY = [];
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
                nav: { home: 'Home', chapters: 'Lectures', project: 'Seminars &amp; Exam', resources: 'Resources', contact: 'Contact' },
                overview: 'Course Overview',
                objectives: 'Learning Outcomes',
                heroTag: 'Blockchain applications as data generators: every transaction, fee and transfer is public and time-stamped. Seven lectures turn that data into statistical evidence on real markets, with Colab notebooks.',
                heroCta1: 'Explore the lectures',
                heroCta2: 'Seminars and exam',
                chapters: 'Lectures',
                chapter: 'Lecture',
                comingSoon: 'Coming soon',
                quantinar: 'Video units on Quantinar',
                formulas: 'Key Formulas',
                links: {
                    slides: 'Slides', lectureNb: 'Notebook', quantlets: 'Quantlets', interactive: 'Interactive', web: 'Web page', colab: 'Open in Colab'
                },
                linkRows: { course: 'Lecture', code: 'Code' },
                projectTitle: 'Seminars: Crypto Economics (Prof. Ilan Alon)',
                seminarIntro: 'Fourteen seminar hours, every day from Monday 16 to Saturday 21 November 2026, the week before the lectures. The seminars use cases, readings, short videos and class debates; prepare the reading or video before each session. The lectures build on these sessions and do not repeat them.',
                assessmentTitle: 'Assessment',
                colSession: 'Session', colTopic: 'Topic', colPrep: 'Preparation',
                resources: 'Resources',
                bibliography: 'Core texts',
                dataSources: 'Data sources',
                contact: 'Contact',
                instructor: 'Lectures and exam',
                seminarCard: 'Seminars and seminar project',
                seminarRole: 'University of Agder',
                office: 'Questions',
                officeText: 'By e-mail, or before and after class',
                close: 'Close',
                footer: 'Blockchain Applications | Master Blockchain for Business | Bucharest University of Economic Studies'
            },
            ro: {
                pageTitle: 'Blockchain Applications - Site-ul cursului',
                courseTitle: 'Blockchain Applications',
                subtitle: 'Masterul Blockchain for Business (MBB) | Facultatea de Administrarea Afacerilor, cu predare în limbi străine (FABIZ) | Academia de Studii Economice din București',
                nav: { home: 'Acasă', chapters: 'Cursuri', project: 'Seminare și examen', resources: 'Resurse', contact: 'Contact' },
                overview: 'Prezentarea cursului',
                objectives: 'Rezultatele învățării',
                heroTag: 'Aplicațiile blockchain generează date: fiecare tranzacție, comision și transfer este public și are o marcă de timp. Cele șapte cursuri transformă aceste date în dovezi statistice despre piețe reale, cu notebook-uri Colab.',
                heroCta1: 'Vezi cursurile',
                heroCta2: 'Seminare și examen',
                chapters: 'Cursuri',
                chapter: 'Cursul',
                comingSoon: 'În curînd',
                quantinar: 'Unități video pe Quantinar',
                formulas: 'Formule cheie',
                links: {
                    slides: 'Slide-uri', lectureNb: 'Notebook', quantlets: 'Quantlets', interactive: 'Interactiv', web: 'Pagina web', colab: 'Deschide în Colab'
                },
                linkRows: { course: 'Curs', code: 'Cod' },
                projectTitle: 'Seminare: Crypto Economics (prof. Ilan Alon)',
                seminarIntro: 'Paisprezece ore de seminar, în fiecare zi, de luni 16 pînă sîmbătă 21 noiembrie 2026, în săptămîna dinaintea cursurilor. Seminarele folosesc studii de caz, lecturi, videoclipuri scurte și dezbateri; pregătiți lectura sau videoclipul înaintea fiecărui seminar. Cursurile pornesc de la aceste seminare și nu le repetă.',
                assessmentTitle: 'Evaluare',
                colSession: 'Seminar', colTopic: 'Temă', colPrep: 'Pregătire',
                resources: 'Resurse',
                bibliography: 'Texte de bază',
                dataSources: 'Surse de date',
                contact: 'Contact',
                instructor: 'Cursuri și examen',
                seminarCard: 'Seminare și proiectul de seminar',
                seminarRole: 'University of Agder',
                office: 'Întrebări',
                officeText: 'Pe e-mail sau înainte și după curs',
                close: 'Închide',
                footer: 'Blockchain Applications | Masterul Blockchain for Business | Academia de Studii Economice din București'
            }
        },

        overview: {
            en: [
                { h: 'Programme', p: ['Master Blockchain for Business (MBB), year I, semester I, 2026–2027', 'Taught in English'] },
                { h: 'Lectures', p: ['7 lectures, Prof. Daniel Traian Pele', 'Mon 23 Nov (L1–L2), Tue 24 Nov (L3–L4), Wed 25 Nov (L5–L6), Thu 26 Nov (L7)'] },
                { h: 'Seminars', p: ['14 hours, Prof. Ilan Alon', 'Daily, Mon 16 – Sat 21 November 2026'] },
                { h: 'Exam', p: ['Friday 27 November 2026, 90 minutes', 'Closed book, one A4 formula sheet'] },
                { h: 'Approach', p: ['Each lecture pairs one application with one statistical method and one Colab notebook', 'Prerequisites: introductory statistics and econometrics; basic Python helps'] },
                { h: 'Tools', p: ['Google Colab notebooks in Python, run in the browser', 'Students need only a Google account'] }
            ],
            ro: [
                { h: 'Program', p: ['Masterul Blockchain for Business (MBB), anul I, semestrul I, 2026–2027', 'Predare în limba engleză: slide-urile și notebook-urile sînt în engleză'] },
                { h: 'Cursuri', p: ['7 cursuri, prof. Daniel Traian Pele', 'Luni 23 nov. (C1–C2), marți 24 nov. (C3–C4), miercuri 25 nov. (C5–C6), joi 26 nov. (C7)'] },
                { h: 'Seminare', p: ['14 ore, prof. Ilan Alon', 'Zilnic, de luni 16 pînă sîmbătă 21 noiembrie 2026'] },
                { h: 'Examen', p: ['Vineri, 27 noiembrie 2026, 90 de minute', 'Fără materiale, cu o foaie de formule A4'] },
                { h: 'Abordare', p: ['Fiecare curs leagă o aplicație de o metodă statistică și de un notebook Colab', 'Cunoștințe necesare: statistică și econometrie introductive; Python la nivel de bază ajută'] },
                { h: 'Instrumente', p: ['Notebook-uri Google Colab în Python, rulate în browser', 'Studenții au nevoie doar de un cont Google'] }
            ]
        },

        objectives: {
            en: [
                'Collect on-chain and market data from public sources (explorers, CoinGecko, DefiLlama, Dune) and describe it with the right summary statistics',
                'Identify the stylized facts of crypto returns (heavy tails, volatility clustering, changing correlations) and explain why normal-distribution assumptions fail',
                'Measure risk with GARCH volatility, Value-at-Risk and Expected Shortfall, and compare crypto with stocks and gold',
                'Monitor and measure stablecoin depeg risk with on-chain and market indicators, including the De-pegging Pressure Index (DPI), using the 2022–2023 depeg episodes as cases',
                "Test market efficiency and detect bubbles (variance ratios, LPPL), and judge network-value claims such as Metcalfe's law",
                'Classify crypto assets and read their networks and sentiment: clustering, factor analysis, event studies',
                'Assess machine learning and AI forecasting claims critically, with out-of-sample evaluation'
            ],
            ro: [
                'Colectați date on-chain și de piață din surse publice (exploratoare de blockchain, CoinGecko, DefiLlama, Dune) și le descrieți cu statisticile potrivite',
                'Identificați faptele stilizate ale randamentelor cripto (cozi groase, volatility clustering, corelații care se schimbă în timp) și explicați de ce ipoteza distribuției Normale nu se verifică',
                'Măsurați riscul cu volatilitatea GARCH, Value-at-Risk și Expected Shortfall și comparați criptoactivele cu acțiunile și cu aurul',
                'Monitorizați și măsurați riscul de depeg al stablecoin-urilor cu indicatori on-chain și de piață, inclusiv De-pegging Pressure Index (DPI), pe episoadele de depeg din 2022–2023',
                'Testați eficiența pieței și detectați bulele (testul raportului varianțelor, LPPL) și evaluați afirmațiile despre valoarea de rețea, precum legea lui Metcalfe',
                'Clasificați criptoactivele și interpretați rețelele și sentimentul lor: clustering, analiză factorială, studii de eveniment',
                'Evaluați critic afirmațiile despre prognozele cu machine learning și AI, cu evaluare out-of-sample'
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
                id: 'l1', num: 1, available: true, date: { en: 'Mon 23 Nov', ro: 'Luni 23 nov.' },
                title: { en: 'Blockchains and Crypto Markets as Data', ro: 'Blockchain-urile și piețele cripto ca date' },
                topics: { en: ['Proof-of-work arithmetic and the supply rule', 'Market concentration: the Herfindahl–Hirschman index (HHI)', 'Data-quality checks on prices and on-chain series', 'Log-linear trends with Newey–West standard errors'], ro: ['Aritmetica proof-of-work și regula de emisiune', 'Concentrarea pieței: indicele Herfindahl–Hirschman (HHI)', 'Verificarea calității datelor pentru prețuri și serii on-chain', 'Trenduri log-liniare cu erori standard Newey–West'] },
                links: L(1, 'blockchains_as_data'),
                quantinar: q('cryptosNfts', 'bcIntro', 'understanding')
            },
            {
                id: 'l2', num: 2, available: true, date: { en: 'Mon 23 Nov', ro: 'Luni 23 nov.' },
                title: { en: 'Stylized Facts, Efficiency and Bubbles', ro: 'Fapte stilizate, eficiență și bule' },
                topics: { en: ['Moments and the Jarque–Bera test; ACF and Ljung–Box', 'Rolling correlations and variance-ratio tests', 'Drawdowns and the LPPL bubble model', "Metcalfe's law as a model of network value"], ro: ['Momente și testul Jarque–Bera; ACF și testul Ljung–Box', 'Corelații pe ferestre mobile și teste ale raportului varianțelor', 'Drawdown-uri și modelul de bulă LPPL', 'Legea lui Metcalfe ca model al valorii de rețea'] },
                links: L(2, 'stylized_facts_efficiency_bubbles'),
                quantinar: q('mechanism', 'returns')
            },
            {
                id: 'l3', num: 3, available: true, date: { en: 'Tue 24 Nov', ro: 'Marți 24 nov.' },
                title: { en: 'Volatility and Tail Risk', ro: 'Volatilitate și tail risk' },
                topics: { en: ['EWMA and GARCH(1,1)-t by maximum likelihood; residual diagnostics', 'VaR and ES: Normal, historical, EWMA, GARCH-t', 'Kupiec and Christoffersen backtests; Basel traffic light', 'A short out-of-sample check'], ro: ['EWMA și GARCH(1,1)-t estimat prin verosimilitate maximă; diagnosticul reziduurilor', 'VaR și ES: Normal, istoric, EWMA, GARCH-t', 'Backtesturile Kupiec și Christoffersen; semaforul Basel', 'O verificare out-of-sample scurtă'] },
                links: L(3, 'volatility_tail_risk'),
                quantinar: q('robustMarkowitz')
            },
            {
                id: 'l4', num: 4, available: true, date: { en: 'Tue 24 Nov', ro: 'Marți 24 nov.' },
                title: { en: 'Stablecoins I: Measuring Depeg Risk and On-Chain Early Warning', ro: 'Stablecoin-uri I: riscul de depeg și avertizarea timpurie on-chain' },
                topics: { en: ['Peg deviations in basis points, exceedance curves and episode counts', 'AMM price impact: constant product and StableSwap', 'Event-level early-warning utility', 'Case: the March 2023 USDC depeg'], ro: ['Abaterile de la paritate în puncte de bază, curbe de depășire și numărul de episoade', 'Impactul asupra prețului în AMM: produs constant și StableSwap', 'Utilitatea avertizării timpurii la nivel de eveniment', 'Studiu de caz: depeg-ul USDC din martie 2023'] },
                links: L(4, 'stablecoins_depeg'),
                quantinar: []
            },
            {
                id: 'l5', num: 5, available: true, date: { en: 'Wed 25 Nov', ro: 'Miercuri 25 nov.' },
                title: { en: 'Stablecoins II: Systemic Depegging Pressure and Portfolios', ro: 'Stablecoin-uri II: presiunea sistemică de depeg și portofolii' },
                topics: { en: ['Reference-adjusted deviations; check loss and quantile regression', '5% Quantile Lasso with GACV selection', 'The De-pegging Pressure Index (DPI)', 'HAC event tests with Holm correction; out-of-sample check-loss skill'], ro: ['Abateri ajustate față de referință; funcția de pierdere check și regresia cuantilă', 'Quantile Lasso la 5%, cu parametrul ales prin GACV', 'De-pegging Pressure Index (DPI)', 'Teste de eveniment cu erori HAC și corecția Holm; performanța out-of-sample după pierderea check'] },
                links: L(5, 'stablecoins_dpi'),
                quantinar: q('frm')
            },
            {
                id: 'l6', num: 6, available: true, date: { en: 'Wed 25 Nov', ro: 'Miercuri 25 nov.' },
                title: { en: 'Networks, Sentiment and Asset Classes', ro: 'Rețele, sentiment și clase de active' },
                topics: { en: ['Correlation distance, minimum spanning trees, absorption ratio', 'Diebold–Yilmaz spillovers', 'Factor analysis and k-means classification of asset classes', 'Market-model event study (CAR) and text sentiment'], ro: ['Distanța de corelație, arbori de acoperire minimi, absorption ratio', 'Spillover-uri Diebold–Yilmaz', 'Analiza factorială și clasificarea k-means a claselor de active', 'Studiu de eveniment cu modelul de piață (CAR) și sentimentul din text'] },
                links: L(6, 'networks_sentiment_art'),
                quantinar: q('networks', 'crossExchange', 'reddit', 'musk', 'dai')
            },
            {
                id: 'l7', num: 7, available: true, date: { en: 'Thu 26 Nov', ro: 'Joi 26 nov.' },
                title: { en: 'Machine Learning, AI and Their Limits; Exam Review', ro: 'Machine learning, AI și limitele lor; recapitulare pentru examen' },
                topics: { en: ['Walk-forward evaluation; Brier score, AUC, Pesaran–Timmermann test', 'Overfitting, SHAP explanations, the deflated Sharpe ratio', 'VaR from GARCH, quantile regression, gradient-boosted trees and Chronos-2', 'Quantile score and Diebold–Mariano tests; look-ahead in pretrained models'], ro: ['Evaluare walk-forward; scorul Brier, AUC, testul Pesaran–Timmermann', 'Overfitting, explicații SHAP, deflated Sharpe ratio', 'VaR din GARCH, regresie cuantilă, gradient-boosted trees și Chronos-2', 'Scorul cuantil și testele Diebold–Mariano; look-ahead în modelele preantrenate'] },
                links: L(7, 'ml_ai_limits'),
                quantinar: q('aiBlockchain', 'p2p')
            }
        ],

        seminars: { en: [
            ['S1', 'Bitcoin and macroeconomics', 'Nakamoto (2008), <em>Bitcoin: a peer-to-peer electronic cash system</em>'],
            ['S2', 'Costs and benefits of cryptocurrencies; crypto due-diligence review', 'Case: <em>Cryptocurrencies: Investment, Money, or Gamble? (A)</em>; Coin Bureau video; Alon video on tokenomics'],
            ['S3–S4', 'Ethereum and smart contracts; debate: Bitcoin vs Ethereum', 'Ethereum white paper'],
            ['S5', 'Polygon', 'Case: <em>Polygon Labs: Scaling Web3 Growth with Cost per Wallet Efficiency</em> (Ivey)'],
            ['S6', 'Stablecoins', 'Coin Bureau video on CBDC updates'],
            ['S7', 'Wallets', 'Coin Bureau video on wallets'],
            ['S8', 'Tokenomics', 'Case: <em>The ripple effect: navigating an XRP investment</em> (The CASE Journal)'],
            ['S9', 'Decentralised autonomous organisations (DAOs)', 'Case: <em>The DAO Hack: A Blockchain Dilemma</em> (Ivey)'],
            ['S10', 'Decentralised finance (DeFi)', 'Case: KaspaCom; guest lecture'],
            ['Final', 'Student presentations: due diligence of a crypto project', 'Team presentations']
        ], ro: [
            ['S1', 'Bitcoin și macroeconomia', 'Nakamoto (2008), <em>Bitcoin: a peer-to-peer electronic cash system</em>'],
            ['S2', 'Costurile și beneficiile criptomonedelor; analiza due diligence a unui proiect cripto', 'Studiu de caz: <em>Cryptocurrencies: Investment, Money, or Gamble? (A)</em>; video Coin Bureau; video al prof. Alon despre tokenomics'],
            ['S3–S4', 'Ethereum și smart contracts; dezbatere: Bitcoin sau Ethereum', 'White paper-ul Ethereum'],
            ['S5', 'Polygon', 'Studiu de caz: <em>Polygon Labs: Scaling Web3 Growth with Cost per Wallet Efficiency</em> (Ivey)'],
            ['S6', 'Stablecoin-uri', 'Video Coin Bureau despre noutățile privind CBDC'],
            ['S7', 'Portofele (wallets)', 'Video Coin Bureau despre portofele'],
            ['S8', 'Tokenomics', 'Studiu de caz: <em>The ripple effect: navigating an XRP investment</em> (The CASE Journal)'],
            ['S9', 'Organizații autonome descentralizate (DAO)', 'Studiu de caz: <em>The DAO Hack: A Blockchain Dilemma</em> (Ivey)'],
            ['S10', 'Finanțe descentralizate (DeFi)', 'Studiu de caz: KaspaCom; prelegerea unui invitat'],
            ['Final', 'Prezentările studenților: due diligence pentru un proiect cripto', 'Prezentări în echipă']
        ] },

        assessment: { en: [
            { h: 'Seminar project: 40%', p: ['Prof. Ilan Alon. Pairs produce a YouTube-style analysis video answering “Should you buy XYZ?” for an assigned crypto project.', 'Four criteria, 25% each: investment thesis and crypto-economic analysis; research, evidence and analytical rigour; critical thinking and risk assessment; presentation quality, creativity and audience engagement.', 'The project is educational and analytical, not financial advice.'] },
            { h: 'Written exam: 60%', p: ['Friday 27 November 2026, 90 minutes, closed book, one A4 formula sheet.', 'Part A (40%): 20 multiple-choice questions on concepts and on reading charts and model output.', 'Part B (60%): 3 short problems built on real output from the course notebooks, for example a GARCH table and a VaR backtest for Bitcoin. No calculations: you interpret the output and draw the conclusion.'] },
            { h: 'Policies', p: ['The course runs over 4 days: attend every lecture. The exam covers all 7 lectures.', 'AI tools may be used to study and to run the notebooks; they are not allowed during the exam.', 'Each slide deck ends with an appendix for self-study; the appendix is not examined.'] }
        ], ro: [
            { h: 'Proiectul de seminar: 40%', p: ['Prof. Ilan Alon. Studenții lucrează în perechi și realizează un video de analiză, în stil YouTube, care răspunde la întrebarea „Ar trebui să cumpărați XYZ?” pentru un proiect cripto primit.', 'Patru criterii, fiecare de 25%: teza de investiție și analiza cripto-economică; documentarea, dovezile și rigoarea analizei; gîndirea critică și evaluarea riscurilor; calitatea prezentării, creativitatea și implicarea publicului.', 'Proiectul are scop educativ și analitic; nu este un sfat financiar.'] },
            { h: 'Examen scris: 60%', p: ['Vineri, 27 noiembrie 2026, 90 de minute, fără materiale, cu o foaie de formule A4.', 'Partea A (40%): 20 de întrebări grilă despre concepte și despre citirea graficelor și a rezultatelor modelelor.', 'Partea B (60%): 3 probleme scurte construite pe rezultate reale din notebook-urile cursului, de exemplu un tabel GARCH și un backtest VaR pentru Bitcoin. Fără calcule: interpretați rezultatele și trageți concluzia.'] },
            { h: 'Reguli', p: ['Cursul se desfășoară pe 4 zile: participați la toate cursurile. Examenul acoperă toate cele 7 cursuri.', 'Instrumentele AI pot fi folosite pentru studiu și pentru rularea notebook-urilor; nu sînt permise la examen.', 'Fiecare set de slide-uri se încheie cu o anexă pentru studiu individual; anexa nu intră în examen.'] }
        ] },

        resources: [
            { icon: '&#128187;', href: REPO, en: ['GitHub Repository', 'Slides, notebooks, Quantlets and data'], ro: ['Repository GitHub', 'Slide-uri, notebook-uri, Quantlets și date'] },
            { icon: '&#127891;', img: 'logos/qr_logo.png', href: 'https://quantinar.com/coursecontent/695/blockchain', en: ['Blockchain Analytics on Quantinar', 'Video course: 23 units with slides and recorded lectures'], ro: ['Blockchain Analytics pe Quantinar', 'Curs video: 23 de unități cu slide-uri și prelegeri înregistrate'] },
            { icon: '&#128190;', img: 'logos/ql_logo.png', href: 'https://quantlet.com', en: ['Quantlet', 'Reproducible code for every chart'], ro: ['Quantlet', 'Cod reproductibil pentru fiecare grafic'] },
            { icon: '&#128200;', href: 'https://thecrix.de', en: ['CRIX', 'CRypto IndeX'], ro: ['CRIX', 'CRypto IndeX'] },
            { icon: '&#127963;', img: 'logos/ida_square.png', href: 'https://theida.net', en: ['IDA', 'Institute for Digital Assets'], ro: ['IDA', 'Institute for Digital Assets'] }
        ],

        dataSources: [
            { name: 'EODHD', href: 'https://eodhd.com', en: 'Daily and hourly prices of cryptos, stablecoins, stocks, indices, FX and gold (the files are in the repository, data/)', ro: 'Prețuri zilnice și orare pentru criptoactive, stablecoin-uri, acțiuni, indici, cursuri valutare și aur (fișierele sînt în repository, data/)' },
            { name: 'CoinGecko', href: 'https://www.coingecko.com', en: 'Crypto prices and market capitalisation', ro: 'Prețuri și capitalizare de piață pentru criptoactive' },
            { name: 'Yahoo Finance', href: 'https://finance.yahoo.com', en: 'Stock, index and gold prices', ro: 'Prețuri pentru acțiuni, indici și aur' },
            { name: 'DefiLlama', href: 'https://defillama.com', en: 'Stablecoin supply and DeFi total value locked', ro: 'Oferta de stablecoin-uri și valoarea totală blocată (TVL) în DeFi' },
            { name: 'Etherscan', href: 'https://etherscan.io', en: 'Ethereum on-chain activity', ro: 'Activitatea on-chain pe Ethereum' },
            { name: 'Dune', href: 'https://dune.com', en: 'SQL queries on on-chain data', ro: 'Interogări SQL pe date on-chain' },
            { name: 'CBECI', href: 'https://ccaf.io/cbnsi/cbeci', en: 'Cambridge Bitcoin Electricity Consumption Index', ro: 'Cambridge Bitcoin Electricity Consumption Index' }
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
            seminar: { name: 'Prof. Ilan Alon', email: 'ilan.alon@uia.no' }
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
