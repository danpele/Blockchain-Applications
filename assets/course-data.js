// ============================================================
// Blockchain Applications course data (EN). Rendered by assets/site.js.
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
    // CODE_READY lists the lectures whose notebook and Quantlets are already in the repo
    const CODE_READY = [];
    const L = (n, base) => ({
        en: [
            { type: 'slides', href: `EN/Lectures/lecture${n}_${base}.pdf` },
            ...(CODE_READY.includes(n) ? [
                { type: 'lectureNb', href: `${REPO}/blob/main/notebooks/lecture${n}_notebook.ipynb`, colab: `${COLAB}notebooks/lecture${n}_notebook.ipynb` },
                { type: 'quantlets', href: `${REPO}/tree/main/Quantlets/L${n}` }
            ] : [])
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
            ]
        },

        chapterCharts: {
            l1: { src: 'charts/ba_l1_value_activity.png', en: 'Bitcoin market value against on-chain activity, monthly, 2014–2026' },
            l2: { src: 'charts/ba_l2_lppl_btc2017.png', en: 'LPPL fit to the 2017 Bitcoin bubble and its estimated critical time' },
            l3: { src: 'charts/ba_l3_var_methods.png', en: 'One-day VaR 1% and ES 2.5% of Bitcoin under four methods' },
            l4: { src: 'charts/ba_l4_svb.png', en: 'USDC, DAI and USDT around the March 2023 SVB depeg, in basis points' },
            l5: { src: 'charts/ba_l5_dpi.png', en: 'De-pegging Pressure Index (DPI), 2020–2026, coloured by quintile' },
            l6: { src: 'charts/ba_l6_mst.png', en: 'Correlations of daily returns and the minimum spanning tree of 20 crypto assets' },
            l7: { src: 'charts/ba_l7_var_models.png', en: 'Bitcoin VaR 1%: breach rates and quantile scores of six models, including Chronos-2' }
        },

        chapters: [
            {
                id: 'l1', num: 1, available: true, date: 'Mon 23 Nov',
                title: { en: 'Blockchains and Crypto Markets as Data' },
                topics: { en: ['Proof-of-work arithmetic and the supply rule', 'Market concentration: the Herfindahl–Hirschman index (HHI)', 'Data-quality checks on prices and on-chain series', 'Log-linear trends with Newey–West standard errors'] },
                links: L(1, 'blockchains_as_data'),
                quantinar: q('cryptosNfts', 'bcIntro', 'understanding')
            },
            {
                id: 'l2', num: 2, available: true, date: 'Mon 23 Nov',
                title: { en: 'Stylized Facts, Efficiency and Bubbles' },
                topics: { en: ['Moments and the Jarque–Bera test; ACF and Ljung–Box', 'Rolling correlations and variance-ratio tests', 'Drawdowns and the LPPL bubble model', "Metcalfe's law as a model of network value"] },
                links: L(2, 'stylized_facts_efficiency_bubbles'),
                quantinar: q('mechanism', 'returns')
            },
            {
                id: 'l3', num: 3, available: true, date: 'Tue 24 Nov',
                title: { en: 'Volatility and Tail Risk' },
                topics: { en: ['EWMA and GARCH(1,1)-t by maximum likelihood; residual diagnostics', 'VaR and ES: Normal, historical, EWMA, GARCH-t', 'Kupiec and Christoffersen backtests; Basel traffic light', 'A short out-of-sample check'] },
                links: L(3, 'volatility_tail_risk'),
                quantinar: q('robustMarkowitz')
            },
            {
                id: 'l4', num: 4, available: true, date: 'Tue 24 Nov',
                title: { en: 'Stablecoins I: Measuring Depeg Risk and On-Chain Early Warning' },
                topics: { en: ['Peg deviations in basis points, exceedance curves and episode counts', 'AMM price impact: constant product and StableSwap', 'Event-level early-warning utility', 'Case: the March 2023 USDC depeg'] },
                links: L(4, 'stablecoins_depeg'),
                quantinar: []
            },
            {
                id: 'l5', num: 5, available: true, date: 'Wed 25 Nov',
                title: { en: 'Stablecoins II: Systemic Depegging Pressure and Portfolios' },
                topics: { en: ['Reference-adjusted deviations; check loss and quantile regression', '5% Quantile Lasso with GACV selection', 'The De-pegging Pressure Index (DPI)', 'HAC event tests with Holm correction; out-of-sample check-loss skill'] },
                links: L(5, 'stablecoins_dpi'),
                quantinar: q('frm')
            },
            {
                id: 'l6', num: 6, available: true, date: 'Wed 25 Nov',
                title: { en: 'Networks, Sentiment and Asset Classes' },
                topics: { en: ['Correlation distance, minimum spanning trees, absorption ratio', 'Diebold–Yilmaz spillovers', 'Factor analysis and k-means classification of asset classes', 'Market-model event study (CAR) and text sentiment'] },
                links: L(6, 'networks_sentiment_art'),
                quantinar: q('networks', 'crossExchange', 'reddit', 'musk', 'dai')
            },
            {
                id: 'l7', num: 7, available: true, date: 'Thu 26 Nov',
                title: { en: 'Machine Learning, AI and Their Limits; Exam Review' },
                topics: { en: ['Walk-forward evaluation; Brier score, AUC, Pesaran–Timmermann test', 'Overfitting, SHAP explanations, the deflated Sharpe ratio', 'VaR from GARCH, quantile regression, gradient-boosted trees and Chronos-2', 'Quantile score and Diebold–Mariano tests; look-ahead in pretrained models'] },
                links: L(7, 'ml_ai_limits'),
                quantinar: q('aiBlockchain', 'p2p')
            }
        ],

        seminars: [
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
        ],

        assessment: [
            { h: 'Seminar project: 40%', p: ['Prof. Ilan Alon. Pairs produce a YouTube-style analysis video answering “Should you buy XYZ?” for an assigned crypto project.', 'Four criteria, 25% each: investment thesis and crypto-economic analysis; research, evidence and analytical rigour; critical thinking and risk assessment; presentation quality, creativity and audience engagement.', 'The project is educational and analytical, not financial advice.'] },
            { h: 'Written exam: 60%', p: ['Friday 27 November 2026, 90 minutes, closed book, one A4 formula sheet.', 'Part A (40%): 20 multiple-choice questions on concepts and on reading charts and model output.', 'Part B (60%): 3 short problems built on real output from the course notebooks, for example a GARCH table and a VaR backtest for Bitcoin. No calculations: you interpret the output and draw the conclusion.'] },
            { h: 'Policies', p: ['The course runs over 4 days: attend every lecture. The exam covers all 7 lectures.', 'AI tools may be used to study and to run the notebooks; they are not allowed during the exam.', 'Each slide deck ends with an appendix for self-study; the appendix is not examined.'] }
        ],

        resources: [
            { icon: '&#128187;', href: REPO, en: ['GitHub Repository', 'Slides, notebooks, Quantlets and data'] },
            { icon: '&#127891;', img: 'logos/qr_logo.png', href: 'https://quantinar.com/coursecontent/695/blockchain', en: ['Blockchain Analytics on Quantinar', 'Video course: 23 units with slides and recorded lectures'] },
            { icon: '&#128190;', img: 'logos/ql_logo.png', href: 'https://quantlet.com', en: ['Quantlet', 'Reproducible code for every chart'] },
            { icon: '&#128200;', href: 'https://thecrix.de', en: ['CRIX', 'CRypto IndeX'] },
            { icon: '&#127963;', img: 'logos/ida_square.png', href: 'https://theida.net', en: ['IDA', 'Institute for Digital Assets'] }
        ],

        dataSources: [
            { name: 'CoinGecko', href: 'https://www.coingecko.com', en: 'Crypto prices and market capitalisation' },
            { name: 'Yahoo Finance', href: 'https://finance.yahoo.com', en: 'Stock, index and gold prices' },
            { name: 'DefiLlama', href: 'https://defillama.com', en: 'Stablecoin supply and DeFi total value locked' },
            { name: 'Etherscan', href: 'https://etherscan.io', en: 'Ethereum on-chain activity' },
            { name: 'Dune', href: 'https://dune.com', en: 'SQL queries on on-chain data' },
            { name: 'CBECI', href: 'https://ccaf.io/cbnsi/cbeci', en: 'Cambridge Bitcoin Electricity Consumption Index' }
        ],

        bibliography: [
            'Härdle, W. K., Harvey, C. R., &amp; Reule, R. C. G. (2020). <a href="https://doi.org/10.1093/jjfinec/nbz033" target="_blank" rel="noopener">Understanding cryptocurrencies</a>. <em>Journal of Financial Econometrics</em>, 18(2), 181–208.',
            'Trimborn, S., &amp; Härdle, W. K. (2018). <a href="https://doi.org/10.1016/j.jempfin.2018.08.004" target="_blank" rel="noopener">CRIX an index for cryptocurrencies</a>. <em>Journal of Empirical Finance</em>, 49, 107–122.',
            'Pele, D. T., Wesselhöfft, N., Härdle, W. K., Kolossiatis, M., &amp; Yatracos, Y. G. (2023). <a href="https://doi.org/10.1080/1351847X.2021.1960403" target="_blank" rel="noopener">Are cryptos becoming alternative assets?</a> <em>The European Journal of Finance</em>, 29(10), 1093–1120.',
            'Lyons, R. K., &amp; Viswanath-Natraj, G. (2023). <a href="https://doi.org/10.1016/j.jimonfin.2022.102777" target="_blank" rel="noopener">What keeps stablecoins stable?</a> <em>Journal of International Money and Finance</em>, 131, 102777.'
        ],

        contact: {
            name: 'Prof. dr. Daniel Traian Pele',
            email: 'danpele@ase.ro',
            en: ['Bucharest University of Economic Studies', 'Department of Statistics and Econometrics'],
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
