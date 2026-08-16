import type { Language } from './i18n';

/**
 * Interface (chrome) strings for the three languages. Interpretive readings
 * live in the MeaningsBundle; this file holds the UI labels, headings and
 * buttons that wrap them.
 */

export type UiKey =
  | 'app.subtitle'
  | 'form.title'
  | 'form.fullName'
  | 'form.currentName'
  | 'form.birthDate'
  | 'form.birthTime'
  | 'form.birthCity'
  | 'form.day'
  | 'form.month'
  | 'form.year'
  | 'form.targetDate'
  | 'form.calculate'
  | 'form.calculating'
  | 'tabs.overview'
  | 'tabs.wheel'
  | 'tabs.loshu'
  | 'tabs.clock'
  | 'tabs.optimizer'
  | 'tabs.energy'
  | 'tabs.synastry'
  | 'tabs.oracle'
  | 'badge.lifePath'
  | 'badge.expression'
  | 'badge.driver'
  | 'badge.conductor'
  | 'lang.label'
  | 'pdf.download'
  | 'pdf.generating'
  | 'pdf.error'
  | 'report.title'
  | 'report.generated'
  | 'card.strengths'
  | 'card.challenges'
  | 'card.careers'
  | 'core.title'
  | 'core.subtitle'
  | 'core.lifePath'
  | 'core.expression'
  | 'core.soulUrge'
  | 'core.personality'
  | 'core.birthday'
  | 'core.maturity'
  | 'core.pinnaclesTitle'
  | 'core.pinnaclesSubtitle'
  | 'core.pinnacle'
  | 'core.challenge'
  | 'core.untilAge'
  | 'core.vedicTitle'
  | 'core.vedicSubtitle'
  | 'core.moolank'
  | 'core.bhagyank'
  | 'core.driverConductor'
  | 'core.chaldeanTitle'
  | 'core.chaldeanSubtitle'
  | 'core.chaldeanSingle'
  | 'core.kabbalah'
  | 'core.compoundLabel'
  | 'core.favorable'
  | 'core.cautionary'
  | 'core.cyclesTitle'
  | 'core.cyclesSubtitle'
  | 'core.personalYear'
  | 'core.personalMonth'
  | 'core.personalDay'
  | 'core.energyTitle'
  | 'core.energySubtitle'
  | 'wheel.howTo'
  | 'wheel.description'
  | 'wheel.click'
  | 'wheel.empty'
  | 'loshu.title'
  | 'loshu.overall'
  | 'loshu.active'
  | 'loshu.present'
  | 'loshu.missing'
  | 'loshu.missingTitle'
  | 'loshu.missingSubtitle'
  | 'loshu.tattvaTitle'
  | 'loshu.tattvaSubtitle'
  | 'loshu.numberTitle'
  | 'energy.empty'
  | 'energy.intro'
  | 'energy.panchaTitle'
  | 'energy.panchaSubtitle'
  | 'energy.dominant'
  | 'energy.absent'
  | 'energy.numbersLabel'
  | 'energy.dominantElement'
  | 'energy.dominantElements'
  | 'energy.absentElement'
  | 'energy.balanced'
  | 'energy.balancing'
  | 'energy.reikiTitle'
  | 'energy.reikiSubtitle'
  | 'energy.symbol'
  | 'energy.auraTitle'
  | 'energy.auraSubtitle'
  | 'energy.dailyRitual'
  | 'energy.wellness'
  | 'energy.notMedical'
  | 'oracle.title'
  | 'oracle.empty'
  | 'oracle.placeholder'
  | 'oracle.ask'
  | 'oracle.stop'
  | 'oracle.inputPlaceholder'
  | 'name.targetLabel'
  | 'name.optimize'
  | 'name.optimizing'
  | 'name.chaldeanBadge'
  | 'name.pythagoreanBadge'
  | 'name.chaldeanSingleLabel'
  | 'name.compoundLabel'
  | 'name.alternatives'
  | 'syn.memberName'
  | 'syn.analyze'
  | 'syn.analyzing'
  | 'syn.addMember'
  | 'syn.teamTitle'
  | 'syn.compatibility'
  | 'syn.strength'
  | 'syn.activePlanes'
  | 'syn.missingPlanes'
  | 'syn.missingCompetencies'
  | 'syn.enterTwo'
  | 'clock.empty'
  | 'clock.now'
  | 'clock.energyTip'
  | 'clock.hour'
  | 'clock.number'
  | 'clock.theme'
  | 'clock.score'
  | 'oracle.coreHeading'
  | 'oracle.coreLifePath'
  | 'oracle.coreExpression'
  | 'oracle.coreSoulUrge'
  | 'oracle.coreVedic'
  | 'oracle.vocationHeading'
  | 'oracle.vocationExpression'
  | 'oracle.vocationYear'
  | 'oracle.relationsHeading'
  | 'oracle.relationsSoulUrge'
  | 'oracle.relationsVedic'
  | 'oracle.timingHeading'
  | 'oracle.timingYear'
  | 'oracle.timingMonthDay'
  | 'oracle.nameHeading'
  | 'oracle.nameCurrent'
  | 'oracle.nameCautionary'
  | 'oracle.nameFavorable'
  | 'oracle.loshuHeading'
  | 'oracle.loshuMissing'
  | 'oracle.loshuNone'
  | 'oracle.energyHeading'
  | 'oracle.energyBalance'
  | 'oracle.energyAbsent'
  | 'oracle.energyBalanced'
  | 'oracle.energyReiki'
  | 'oracle.energyAura'
  | 'oracle.energyDaily'
  | 'oracle.generalHeading'
  | 'oracle.generalYear'
  | 'oracle.generalDay'
  | 'assistant.title'
  | 'assistant.subtitle'
  | 'assistant.placeholder'
  | 'assistant.send'
  | 'assistant.stop'
  | 'assistant.clear'
  | 'assistant.suggestTitle'
  | 'assistant.suggest.tabs'
  | 'assistant.suggest.numerology'
  | 'assistant.suggest.reiki'
  | 'assistant.suggest.panchatatva'
  | 'assistant.suggest.planets'
  | 'assistant.open'
  | 'assistant.close'
  | 'about.hero.badge'
  | 'about.hero.title'
  | 'about.hero.welcome'
  | 'about.hero.name'
  | 'about.hero.desc'
  | 'about.hero.exploreServices'
  | 'about.hero.useTool'
  | 'about.card.title'
  | 'about.card.p1'
  | 'about.card.p2'
  | 'about.card.disclaimer'
  | 'about.services.label'
  | 'about.services.title'
  | 'about.services.desc'
  | 'about.services.reading.title'
  | 'about.services.reading.desc'
  | 'about.services.name.title'
  | 'about.services.name.desc'
  | 'about.services.vedic.title'
  | 'about.services.vedic.desc'
  | 'about.services.aura.title'
  | 'about.services.aura.desc'
  | 'about.process.label'
  | 'about.process.title'
  | 'about.process.step1.title'
  | 'about.process.step1.desc'
  | 'about.process.step2.title'
  | 'about.process.step2.desc'
  | 'about.process.step3.title'
  | 'about.process.step3.desc'
  | 'about.cta.title'
  | 'about.cta.desc'
  | 'about.cta.button';

type StringMap = Record<UiKey, string>;

const EN: StringMap = {
  'app.subtitle':
    'Pythagorean · Chaldean · Vedic · Lo Shu · Kabbalah — a unified numerological intelligence engine.',
  'form.title': 'Birth Profile',
  'form.fullName': 'Full birth name',
  'form.currentName': 'Current name',
  'form.birthDate': 'Birth date',
  'form.birthTime': 'Birth time',
  'form.birthCity': 'Birth city',
  'form.day': 'Day',
  'form.month': 'Month',
  'form.year': 'Year',
  'form.targetDate': 'Target date',
  'form.calculate': 'Calculate Matrix',
  'form.calculating': 'Calculating…',
  'tabs.overview': 'Overview',
  'tabs.wheel': 'Matrix Wheel',
  'tabs.loshu': 'Lo Shu',
  'tabs.clock': 'Hour Clock',
  'tabs.optimizer': 'Name Optimizer',
  'tabs.energy': 'Energy',
  'tabs.synastry': 'Synastry',
  'tabs.oracle': 'Oracle',
  'badge.lifePath': 'Life Path',
  'badge.expression': 'Expression',
  'badge.driver': 'Driver',
  'badge.conductor': 'Conductor',
  'lang.label': 'Language',
  'pdf.download': 'Download PDF',
  'pdf.generating': 'Generating…',
  'pdf.error': 'Could not generate the PDF. Please try again.',
  'report.title': 'OmniNumerology — Numerology Report',
  'report.generated': 'Generated by OmniNumerology',
  'card.strengths': 'Strengths',
  'card.challenges': 'Challenges',
  'card.careers': 'Ideal paths:',
  'core.title': 'The Core Numbers',
  'core.subtitle':
    'Five numbers form the foundation of a Pythagorean reading — your Life Path (the road), Expression (the vehicle), Soul Urge (the fuel), Personality (the exterior), and Birthday (a special gift).',
  'core.lifePath': 'Life Path',
  'core.expression': 'Expression / Destiny',
  'core.soulUrge': "Soul Urge / Heart's Desire",
  'core.personality': 'Personality',
  'core.birthday': 'Birthday Number',
  'core.maturity': 'Maturity Number',
  'core.pinnaclesTitle': 'Pinnacles & Challenges',
  'core.pinnaclesSubtitle':
    'Four Pinnacle cycles (the seasons of your life) and four Challenge numbers (the obstacles to integrate along the way).',
  'core.pinnacle': 'Pinnacle',
  'core.challenge': 'Challenge',
  'core.untilAge': 'until age {age}',
  'core.vedicTitle': 'Vedic — Sankhya Shastra',
  'core.vedicSubtitle':
    'The Moolank (Psychic/Driver, from your birth day) and Bhagyank (Destiny/Conductor, from your full birth date), each ruled by a planet.',
  'core.moolank': 'Moolank (Driver)',
  'core.bhagyank': 'Bhagyank (Conductor)',
  'core.driverConductor': 'Driver ↔ Conductor',
  'core.chaldeanTitle': 'Chaldean & Kabbalah',
  'core.chaldeanSubtitle':
    "Chaldean reads both a single number and a 'compound' number (10-52) from your name; Kabbalah maps it to a Sephirah of the Tree of Life.",
  'core.chaldeanSingle': 'Chaldean Single (compound {compound})',
  'core.kabbalah': 'Kabbalah',
  'core.compoundLabel': 'Compound number {compound}',
  'core.favorable': 'Favorable',
  'core.cautionary': 'Cautionary',
  'core.cyclesTitle': 'Personal Cycles',
  'core.cyclesSubtitle':
    'Personal Year, Month and Day describe the timing of your current experience, computed from your birth date and the target date.',
  'core.personalYear': 'Personal Year',
  'core.personalMonth': 'Personal Month',
  'core.personalDay': 'Personal Day',
  'core.energyTitle': 'Energy & Healing',
  'core.energySubtitle':
    'A compact Reiki and aura reference for each core number. The full Panchatatva balance and cleansing practices live in the Energy & Remedies tab.',
  'wheel.howTo': 'How to read this wheel',
  'wheel.description':
    'The inner ring shows your five core numbers (Life Path, Expression, Soul Urge, Personality, Birthday). The outer ring shows the four Pinnacle cycles that mark the seasons of your life.',
  'wheel.click': 'Click any segment to reveal its detailed meaning.',
  'wheel.empty': 'Calculate your matrix to reveal the wheel.',
  'loshu.title': 'Lo Shu Magic Square',
  'loshu.overall': 'Overall',
  'loshu.active': 'Active',
  'loshu.present': 'Present numbers',
  'loshu.missing': 'Missing numbers',
  'loshu.missingTitle': 'Missing Numbers & Remedies',
  'loshu.missingSubtitle':
    'Each missing digit signals an energy to consciously develop. The remedies below are practical ways to balance that vibration.',
  'loshu.tattvaTitle': 'Panchatatva — Five Elements',
  'loshu.tattvaSubtitle':
    'Each digit in the grid belongs to a tattva. This five-element model (including Ether/Akash for number 5) is a balance layer — synastry scoring uses the classical four-element grouping.',
  'loshu.numberTitle': 'Number {n}',
  'energy.empty': 'Calculate your matrix to reveal energy and healing remedies.',
  'energy.intro':
    'A complementary energy layer derived from your core numbers: your Panchatatva (five-element) balance, Reiki chakra alignment, and aura-cleansing practice. This is a spiritual wellness guide — not medical advice.',
  'energy.panchaTitle': 'Panchatatva Balance',
  'energy.panchaSubtitle':
    'Five elements (Earth, Water, Fire, Air, Ether) counted across your seven core numbers. Ether (Akash) is ruled by the number 5.',
  'energy.dominant': 'Dominant',
  'energy.absent': 'Absent',
  'energy.numbersLabel': 'Numbers',
  'energy.dominantElement': 'Dominant element: {element}.',
  'energy.dominantElements': 'Dominant elements: {elements}.',
  'energy.absentElement':
    'Your chart has no number in {elements}, so balance that energy consciously with the practices below.',
  'energy.balanced': 'All five elements are represented — a naturally balanced constitution.',
  'energy.balancing': 'balancing',
  'energy.reikiTitle': 'Reiki Chakra Alignment',
  'energy.reikiSubtitle': 'Each core number resonates with a chakra and a Usui Reiki symbol.',
  'energy.symbol': 'Symbol',
  'energy.auraTitle': 'Aura Cleaning',
  'energy.auraSubtitle':
    'Your aura colour and a cleansing practice tuned to each core number, plus a daily ritual.',
  'energy.dailyRitual': 'Daily aura-cleansing ritual',
  'energy.wellness': 'Spiritual wellness guidance',
  'energy.notMedical': 'Not medical advice',
  'oracle.title': 'Oracle',
  'oracle.empty': 'Calculate your matrix first to consult the oracle.',
  'oracle.placeholder':
    'Ask about career, love, timing, your name, or missing numbers. The oracle answers strictly from your computed numbers.',
  'oracle.ask': 'Ask',
  'oracle.stop': 'Stop',
  'oracle.inputPlaceholder': 'Ask the oracle…',
  'name.targetLabel': 'Target name',
  'name.optimize': 'Optimize',
  'name.optimizing': 'Optimizing…',
  'name.chaldeanBadge': 'Chaldean {single} / compound {compound}',
  'name.pythagoreanBadge': 'Pythagorean expression {n}',
  'name.chaldeanSingleLabel': 'Chaldean single {n}',
  'name.compoundLabel': 'Compound {n}',
  'name.alternatives': 'Positive alternatives',
  'syn.memberName': 'Member {i} name',
  'syn.analyze': 'Analyze team',
  'syn.analyzing': 'Analyzing…',
  'syn.addMember': 'Add member',
  'syn.teamTitle': 'Team Lo Shu ({n} members)',
  'syn.compatibility': 'Compatibility {n}/100',
  'syn.strength': 'Strength {n}%',
  'syn.activePlanes': 'Active planes',
  'syn.missingPlanes': 'Missing planes',
  'syn.missingCompetencies': 'Missing group competencies',
  'syn.enterTwo': 'Enter at least two profiles.',
  'clock.empty': 'Calculate your matrix to reveal the personal hour clock.',
  'clock.now': 'Now',
  'clock.energyTip': 'Energy tip',
  'clock.hour': 'Hour',
  'clock.number': '#',
  'clock.theme': 'Theme',
  'clock.score': 'Score',
  'oracle.coreHeading': 'Core Numbers',
  'oracle.coreLifePath': 'Life Path {n}: {meaning}',
  'oracle.coreExpression': 'Expression {n}: {meaning}',
  'oracle.coreSoulUrge': 'Soul Urge {n}: {meaning}',
  'oracle.coreVedic': 'Vedic Moolank {moolank} ({moolankPlanet}) and Bhagyank {bhagyank} ({bhagyankPlanet}).',
  'oracle.vocationHeading': 'Vocation & Prosperity',
  'oracle.vocationExpression': 'Your Expression number {n} ({meaning}) shapes your natural professional strengths.',
  'oracle.vocationYear': 'The Personal Year {n} guidance: {meaning}',
  'oracle.relationsHeading': 'Relationships',
  'oracle.relationsSoulUrge': 'Your Soul Urge {n} ({meaning}) reveals what you truly seek in a partner.',
  'oracle.relationsVedic': 'In the Vedic system, your Moolank {moolank} is {relation} toward your Bhagyank {bhagyank}.',
  'oracle.timingHeading': 'Timing',
  'oracle.timingYear': 'Personal Year {n}: {meaning}',
  'oracle.timingMonthDay': "Personal Month {month} and Personal Day {day} set today's rhythm.",
  'oracle.nameHeading': 'Name Analysis',
  'oracle.nameCurrent': 'Your current name carries the Chaldean single number {single} and compound number {compound}{meaning}.',
  'oracle.nameCautionary': 'This compound number is traditionally flagged as cautionary; consider a spelling adjustment to shift it toward a positive compound.',
  'oracle.nameFavorable': 'This compound number is traditionally regarded as favorable.',
  'oracle.loshuHeading': 'Lo Shu Gaps & Remedies',
  'oracle.loshuMissing': 'Missing numbers: {list}.',
  'oracle.loshuNone': 'No numbers are missing from your Lo Shu grid.',
  'oracle.energyHeading': 'Energy & Healing',
  'oracle.energyBalance': 'Panchatatva balance across your core numbers: {balance}.',
  'oracle.energyAbsent': 'Absent element(s): {elements}. {practices}',
  'oracle.energyBalanced': 'All five elements are represented in your chart.',
  'oracle.energyReiki': 'Life Path {n} resonates with the {chakra}, symbol {symbol} — {focus}',
  'oracle.energyAura': 'Your aura leans {color}. {practice}',
  'oracle.energyDaily': 'Daily ritual: {ritual}',
  'oracle.generalHeading': 'General Reading',
  'oracle.generalYear': 'Personal Year {n}: {meaning}',
  'oracle.generalDay': 'Today is a Personal Day {day}; the hour windows are mapped in your Personal Hour Clock.',
  'assistant.title': 'Numerology Guide',
  'assistant.subtitle': 'Ask me about the tabs, numerology, planets, Reiki, or Panchatatva.',
  'assistant.placeholder': 'Ask a question…',
  'assistant.send': 'Ask',
  'assistant.stop': 'Stop',
  'assistant.clear': 'Clear',
  'assistant.suggestTitle': 'Try asking:',
  'assistant.suggest.tabs': 'What do the tabs mean?',
  'assistant.suggest.numerology': 'What is my Life Path number?',
  'assistant.suggest.reiki': 'How does Reiki work?',
  'assistant.suggest.panchatatva': 'What is Panchatatva?',
  'assistant.suggest.planets': 'Which planet rules each number?',
  'assistant.open': 'Open assistant',
  'assistant.close': 'Close assistant',
  'about.hero.badge': 'Numerology & Aura Cleansing',
  'about.hero.title': 'Guidance that helps you reconnect with your inner direction.',
  'about.hero.welcome': "Welcome — I'm",
  'about.hero.name': 'Supriya Tambe',
  'about.hero.desc': 'Through numerology and aura cleansing, I offer a gentle space for reflection, self-understanding, and intentional next steps.',
  'about.hero.exploreServices': 'Explore services',
  'about.hero.useTool': 'Use the numerology tool',
  'about.card.title': 'A thoughtful, grounded approach',
  'about.card.p1': 'Supriya has completed training in numerology and aura cleansing. Her practice brings these traditions together with attentive listening and practical, everyday reflection.',
  'about.card.p2': 'Each session is personal, confidential, and focused on the questions that matter most to you.',
  'about.card.disclaimer': 'These services are intended for spiritual reflection and personal wellbeing. They do not replace medical, mental-health, legal, or financial advice.',
  'about.services.label': 'Services',
  'about.services.title': 'Support for your unique journey',
  'about.services.desc': 'Choose a focused reading or combine areas in a session that is shaped around your current intention.',
  'about.services.reading.title': 'Personal Numerology Reading',
  'about.services.reading.desc': 'A thoughtful reading of your core numbers, life path, personal cycles, and the themes that may support reflection and clarity.',
  'about.services.name.title': 'Name & Business Numerology',
  'about.services.name.desc': 'Explore the energetic patterns in a name, with practical guidance for personal, professional, or business identity choices.',
  'about.services.vedic.title': 'Lo Shu & Vedic Insights',
  'about.services.vedic.desc': 'Discover patterns through the Lo Shu grid and Vedic number traditions, including strengths, missing numbers, and balancing practices.',
  'about.services.aura.title': 'Aura Cleansing & Energy Balancing',
  'about.services.aura.desc': 'Gentle, wellness-oriented practices intended to support calm, grounding, and a renewed sense of personal space.',
  'about.process.label': 'What to expect',
  'about.process.title': 'A clear, personal process',
  'about.process.step1.title': 'Share your details',
  'about.process.step1.desc': 'Bring your name and birth details so the session can be personal to you.',
  'about.process.step2.title': 'Receive your reading',
  'about.process.step2.desc': 'Explore your numbers and questions in a calm, supportive conversation.',
  'about.process.step3.title': 'Take aligned next steps',
  'about.process.step3.desc': 'Leave with reflections and simple practices to carry into everyday life.',
  'about.cta.title': 'Start with your numbers',
  'about.cta.desc': 'Use the OmniNumerology tool to explore your core number patterns, then bring your questions to a personal session with Supriya.',
  'about.cta.button': 'Explore my numerology',
};

const HI: StringMap = {
  'app.subtitle':
    'पायथागोरियन · काल्डियन · वैदिक · लो शू · कब्बालाह — एक एकीकृत अंकशास्त्रीय बुद्धिमत्ता इंजन।',
  'form.title': 'जन्म प्रोफ़ाइल',
  'form.fullName': 'पूर्ण जन्म नाम',
  'form.currentName': 'वर्तमान नाम',
  'form.birthDate': 'जन्म तिथि',
  'form.birthTime': 'जन्म समय',
  'form.birthCity': 'जन्म नगर',
  'form.day': 'दिन',
  'form.month': 'माह',
  'form.year': 'वर्ष',
  'form.targetDate': 'लक्ष्य तिथि',
  'form.calculate': 'मैट्रिक्स की गणना करें',
  'form.calculating': 'गणना हो रही है…',
  'tabs.overview': 'अवलोकन',
  'tabs.wheel': 'मैट्रिक्स चक्र',
  'tabs.loshu': 'लो शू',
  'tabs.clock': 'घंटा घड़ी',
  'tabs.optimizer': 'नाम अनुकूलक',
  'tabs.energy': 'ऊर्जा',
  'tabs.synastry': 'सिनेस्ट्री',
  'tabs.oracle': 'ओरेकल',
  'badge.lifePath': 'जीवन पथ',
  'badge.expression': 'अभिव्यक्ति',
  'badge.driver': 'चालक',
  'badge.conductor': 'संचालक',
  'lang.label': 'भाषा',
  'pdf.download': 'PDF डाउनलोड करें',
  'pdf.generating': 'बना रहे हैं…',
  'pdf.error': 'PDF नहीं बन सका। कृपया पुनः प्रयास करें।',
  'report.title': 'ओमनीन्यूमरोलॉजी — अंकशास्त्र रिपोर्ट',
  'report.generated': 'ओमनीन्यूमरोलॉजी द्वारा निर्मित',
  'card.strengths': 'शक्तियाँ',
  'card.challenges': 'चुनौतियाँ',
  'card.careers': 'आदर्श मार्ग:',
  'core.title': 'मुख्य अंक',
  'core.subtitle':
    'पाँच अंक पायथागोरियन गणना की नींव बनाते हैं — जीवन पथ (मार्ग), अभिव्यक्ति (वाहन), आत्मा की चाह (ईंधन), व्यक्तित्व (बाहरी रूप), और जन्मदिन (विशेष उपहार)।',
  'core.lifePath': 'जीवन पथ',
  'core.expression': 'अभिव्यक्ति / भाग्य',
  'core.soulUrge': 'आत्मा की चाह / हृदय की इच्छा',
  'core.personality': 'व्यक्तित्व',
  'core.birthday': 'जन्मदिन अंक',
  'core.maturity': 'परिपक्वता अंक',
  'core.pinnaclesTitle': 'शिखर और चुनौतियाँ',
  'core.pinnaclesSubtitle':
    'चार शिखर चक्र (आपके जीवन की ऋतुएँ) और चार चुनौती अंक (रास्ते में जोड़ने योग्य बाधाएँ)।',
  'core.pinnacle': 'शिखर',
  'core.challenge': 'चुनौती',
  'core.untilAge': 'आयु {age} तक',
  'core.vedicTitle': 'वैदिक — सांख्य शास्त्र',
  'core.vedicSubtitle':
    'मूलांक (मानसिक/चालक, आपके जन्म दिन से) और भाग्यांक (भाग्य/संचालक, पूर्ण जन्म तिथि से), प्रत्येक एक ग्रह द्वारा शासित।',
  'core.moolank': 'मूलांक (चालक)',
  'core.bhagyank': 'भाग्यांक (संचालक)',
  'core.driverConductor': 'चालक ↔ संचालक',
  'core.chaldeanTitle': 'काल्डियन और कब्बालाह',
  'core.chaldeanSubtitle':
    'काल्डियन आपके नाम से एकल अंक और एक "यौगिक" अंक (10-52) दोनों पढ़ता है; कब्बालाह इसे जीवन वृक्ष के सेफिरा से जोड़ता है।',
  'core.chaldeanSingle': 'काल्डियन एकल (यौगिक {compound})',
  'core.kabbalah': 'कब्बालाह',
  'core.compoundLabel': 'यौगिक अंक {compound}',
  'core.favorable': 'शुभ',
  'core.cautionary': 'सावधान',
  'core.cyclesTitle': 'व्यक्तिगत चक्र',
  'core.cyclesSubtitle':
    'व्यक्तिगत वर्ष, माह और दिन आपके वर्तमान अनुभव का समय बताते हैं, जो आपकी जन्म तिथि और लक्ष्य तिथि से गणना किए जाते हैं।',
  'core.personalYear': 'व्यक्तिगत वर्ष',
  'core.personalMonth': 'व्यक्तिगत माह',
  'core.personalDay': 'व्यक्तिगत दिन',
  'core.energyTitle': 'ऊर्जा और उपचार',
  'core.energySubtitle':
    'प्रत्येक मुख्य अंक के लिए एक संक्षिप्त रेकी और आभा संदर्भ। पूर्ण पंचतत्त्व संतुलन और शुद्धिकरण विधियाँ ऊर्जा व उपचार टैब में हैं।',
  'wheel.howTo': 'इस चक्र को कैसे पढ़ें',
  'wheel.description':
    'आंतरिक वलय आपके पाँच मुख्य अंक (जीवन पथ, अभिव्यक्ति, आत्मा की चाह, व्यक्तित्व, जन्मदिन) दिखाता है। बाहरी वलय चार शिखर चक्र दिखाता है जो आपके जीवन की ऋतुएँ चिह्नित करते हैं।',
  'wheel.click': 'किसी भी खंड पर क्लिक कर उसका विस्तृत अर्थ देखें।',
  'wheel.empty': 'चक्र देखने के लिए अपने मैट्रिक्स की गणना करें।',
  'loshu.title': 'लो शू जादुई वर्ग',
  'loshu.overall': 'कुल',
  'loshu.active': 'सक्रिय',
  'loshu.present': 'उपस्थित अंक',
  'loshu.missing': 'अनुपस्थित अंक',
  'loshu.missingTitle': 'अनुपस्थित अंक और उपाय',
  'loshu.missingSubtitle':
    'प्रत्येक अनुपस्थित अंक उस ऊर्जा का संकेत देता है जिसे सचेत रूप से विकसित करना है। नीचे दिए उपाय उस स्पंदन को संतुलित करने के व्यावहारिक तरीके हैं।',
  'loshu.tattvaTitle': 'पंचतत्त्व — पाँच तत्व',
  'loshu.tattvaSubtitle':
    'ग्रिड का प्रत्येक अंक एक तत्त्व से संबंधित है। यह पाँच-तत्व मॉडल (अंक 5 के लिए आकाश सहित) एक संतुलन परत है — सिनेस्ट्री गणना चार-तत्व समूह का उपयोग करती है।',
  'loshu.numberTitle': 'अंक {n}',
  'energy.empty': 'ऊर्जा और उपचार के उपाय देखने के लिए अपने मैट्रिक्स की गणना करें।',
  'energy.intro':
    'आपके मुख्य अंकों से व्युत्पन्न एक पूरक ऊर्जा परत: आपका पंचतत्त्व (पाँच-तत्व) संतुलन, रेकी चक्र संरेखण, और आभा-शुद्धि अभ्यास। यह आध्यात्मिक कल्याण मार्गदर्शिका है — चिकित्सा सलाह नहीं।',
  'energy.panchaTitle': 'पंचतत्त्व संतुलन',
  'energy.panchaSubtitle':
    'पाँच तत्व (पृथ्वी, जल, अग्नि, वायु, आकाश) आपके सात मुख्य अंकों में गिने जाते हैं। आकाश पर अंक 5 का शासन है।',
  'energy.dominant': 'प्रबल',
  'energy.absent': 'अनुपस्थित',
  'energy.numbersLabel': 'अंक',
  'energy.dominantElement': 'प्रबल तत्व: {element}।',
  'energy.dominantElements': 'प्रबल तत्व: {elements}।',
  'energy.absentElement':
    'आपकी कुंडली में {elements} का कोई अंक नहीं है, इसलिए नीचे दिए अभ्यासों से उस ऊर्जा को सचेत रूप से संतुलित करें।',
  'energy.balanced': 'सभी पाँच तत्व उपस्थित हैं — स्वाभाविक रूप से संतुलित संरचना।',
  'energy.balancing': 'संतुलन',
  'energy.reikiTitle': 'रेकी चक्र संरेखण',
  'energy.reikiSubtitle': 'प्रत्येक मुख्य अंक एक चक्र और एक उसुई रेकी प्रतीक से गूंजता है।',
  'energy.symbol': 'प्रतीक',
  'energy.auraTitle': 'आभा शुद्धि',
  'energy.auraSubtitle': 'प्रत्येक मुख्य अंक के अनुरूप आपका आभा रंग और एक शुद्धिकरण अभ्यास, साथ में एक दैनिक अनुष्ठान।',
  'energy.dailyRitual': 'दैनिक आभा-शुद्धि अनुष्ठान',
  'energy.wellness': 'आध्यात्मिक कल्याण मार्गदर्शन',
  'energy.notMedical': 'चिकित्सा सलाह नहीं',
  'oracle.title': 'ओरेकल',
  'oracle.empty': 'ओरेकल से परामर्श करने के लिए पहले अपने मैट्रिक्स की गणना करें।',
  'oracle.placeholder':
    'करियर, प्रेम, समय, अपने नाम या अनुपस्थित अंकों के बारे में पूछें। ओरेकल केवल आपके गणना किए अंकों से उत्तर देता है।',
  'oracle.ask': 'पूछें',
  'oracle.stop': 'रोकें',
  'oracle.inputPlaceholder': 'ओरेकल से पूछें…',
  'name.targetLabel': 'लक्ष्य नाम',
  'name.optimize': 'अनुकूलित करें',
  'name.optimizing': 'अनुकूलित हो रहा है…',
  'name.chaldeanBadge': 'काल्डियन {single} / यौगिक {compound}',
  'name.pythagoreanBadge': 'पायथागोरियन अभिव्यक्ति {n}',
  'name.chaldeanSingleLabel': 'काल्डियन एकल {n}',
  'name.compoundLabel': 'यौगिक {n}',
  'name.alternatives': 'सकारात्मक विकल्प',
  'syn.memberName': 'सदस्य {i} नाम',
  'syn.analyze': 'टीम का विश्लेषण करें',
  'syn.analyzing': 'विश्लेषण हो रहा है…',
  'syn.addMember': 'सदस्य जोड़ें',
  'syn.teamTitle': 'टीम लो शू ({n} सदस्य)',
  'syn.compatibility': 'अनुकूलता {n}/100',
  'syn.strength': 'शक्ति {n}%',
  'syn.activePlanes': 'सक्रिय स्तर',
  'syn.missingPlanes': 'अनुपस्थित स्तर',
  'syn.missingCompetencies': 'अनुपस्थित सामूहिक दक्षताएँ',
  'syn.enterTwo': 'कम से कम दो प्रोफ़ाइल दर्ज करें।',
  'clock.empty': 'व्यक्तिगत घंटा घड़ी देखने के लिए अपने मैट्रिक्स की गणना करें।',
  'clock.now': 'अभी',
  'clock.energyTip': 'ऊर्जा सुझाव',
  'clock.hour': 'घंटा',
  'clock.number': '#',
  'clock.theme': 'विषय',
  'clock.score': 'स्कोर',
  'oracle.coreHeading': 'मुख्य अंक',
  'oracle.coreLifePath': 'जीवन पथ {n}: {meaning}',
  'oracle.coreExpression': 'अभिव्यक्ति {n}: {meaning}',
  'oracle.coreSoulUrge': 'आत्मा की चाह {n}: {meaning}',
  'oracle.coreVedic': 'वैदिक मूलांक {moolank} ({moolankPlanet}) और भाग्यांक {bhagyank} ({bhagyankPlanet})।',
  'oracle.vocationHeading': 'व्यवसाय और समृद्धि',
  'oracle.vocationExpression': 'आपका अभिव्यक्ति अंक {n} ({meaning}) आपकी स्वाभाविक व्यावसायिक शक्तियों को आकार देता है।',
  'oracle.vocationYear': 'व्यक्तिगत वर्ष {n} का मार्गदर्शन: {meaning}',
  'oracle.relationsHeading': 'संबंध',
  'oracle.relationsSoulUrge': 'आपकी आत्मा की चाह {n} ({meaning}) बताती है कि आप साथी में वास्तव में क्या चाहते हैं।',
  'oracle.relationsVedic': 'वैदिक प्रणाली में, आपका मूलांक {moolank} आपके भाग्यांक {bhagyank} के प्रति {relation} है।',
  'oracle.timingHeading': 'समय',
  'oracle.timingYear': 'व्यक्तिगत वर्ष {n}: {meaning}',
  'oracle.timingMonthDay': 'व्यक्तिगत माह {month} और व्यक्तिगत दिन {day} आज की लय तय करते हैं।',
  'oracle.nameHeading': 'नाम विश्लेषण',
  'oracle.nameCurrent': 'आपके वर्तमान नाम में काल्डियन एकल अंक {single} और यौगिक अंक {compound}{meaning} है।',
  'oracle.nameCautionary': 'यह यौगिक अंक पारंपरिक रूप से सावधानी का संकेत है; सकारात्मक यौगिक की ओर ले जाने के लिए वर्तनी में बदलाव पर विचार करें।',
  'oracle.nameFavorable': 'यह यौगिक अंक पारंपरिक रूप से शुभ माना जाता है।',
  'oracle.loshuHeading': 'लो शू अंतराल और उपाय',
  'oracle.loshuMissing': 'अनुपस्थित अंक: {list}।',
  'oracle.loshuNone': 'आपके लो शू ग्रिड में कोई अंक अनुपस्थित नहीं है।',
  'oracle.energyHeading': 'ऊर्जा और उपचार',
  'oracle.energyBalance': 'आपके मुख्य अंकों में पंचतत्त्व संतुलन: {balance}।',
  'oracle.energyAbsent': 'अनुपस्थित तत्व: {elements}। {practices}',
  'oracle.energyBalanced': 'आपकी कुंडली में सभी पाँच तत्व उपस्थित हैं।',
  'oracle.energyReiki': 'जीवन पथ {n} {chakra} से गूंजता है, प्रतीक {symbol} — {focus}',
  'oracle.energyAura': 'आपकी आभा {color} की ओर झुकती है। {practice}',
  'oracle.energyDaily': 'दैनिक अनुष्ठान: {ritual}',
  'oracle.generalHeading': 'सामान्य गणना',
  'oracle.generalYear': 'व्यक्तिगत वर्ष {n}: {meaning}',
  'oracle.generalDay': 'आज व्यक्तिगत दिन {day} है; घंटे की खिड़कियाँ आपकी व्यक्तिगत घंटा घड़ी में मैप की गई हैं।',
  'assistant.title': 'अंकज्योतिष मार्गदर्शक',
  'assistant.subtitle': 'मुझसे टैब, अंकज्योतिष, ग्रह, रेकी या पंचतत्त्व के बारे में पूछें।',
  'assistant.placeholder': 'प्रश्न पूछें…',
  'assistant.send': 'पूछें',
  'assistant.stop': 'रोकें',
  'assistant.clear': 'साफ़ करें',
  'assistant.suggestTitle': 'पूछने का प्रयास करें:',
  'assistant.suggest.tabs': 'टैब का क्या अर्थ है?',
  'assistant.suggest.numerology': 'मेरा जीवन पथ अंक क्या है?',
  'assistant.suggest.reiki': 'रेकी कैसे काम करती है?',
  'assistant.suggest.panchatatva': 'पंचतत्त्व क्या है?',
  'assistant.suggest.planets': 'प्रत्येक अंक पर कौन सा ग्रह शासन करता है?',
  'assistant.open': 'सहायक खोलें',
  'assistant.close': 'सहायक बंद करें',
  'about.hero.badge': 'अंकज्योतिष और औरा शुद्धिकरण',
  'about.hero.title': 'मार्गदर्शन जो आपको अपनी आंतरिक दिशा से फिर से जोड़ने में मदद करता है।',
  'about.hero.welcome': 'स्वागत है — मैं हूँ',
  'about.hero.name': 'सुप्रिया तांबे',
  'about.hero.desc': 'अंकज्योतिष और औरा शुद्धिकरण के माध्यम से, मैं चिंतन, आत्म-समझ और सचेत अगले कदमों के लिए एक कोमल स्थान प्रदान करती हूँ।',
  'about.hero.exploreServices': 'सेवाएं देखें',
  'about.hero.useTool': 'अंकज्योतिष टूल का उपयोग करें',
  'about.card.title': 'एक विचारशील, स्थिर दृष्टिकोण',
  'about.card.p1': 'सुप्रिया ने अंकज्योतिष और औरा शुद्धिकरण में प्रशिक्षण पूरा कर लिया है। उनकी अभ्यास शैली इन परंपराओं को ध्यानपूर्वक सुनने और व्यावहारिक, रोज़मर्रा के चिंतन के साथ जोड़ती है।',
  'about.card.p2': 'प्रत्येक सत्र व्यक्तिगत, गोपनीय है, और उन प्रश्नों पर केंद्रित है जो आपके लिए सबसे महत्वपूर्ण हैं।',
  'about.card.disclaimer': 'ये सेवाएं आध्यात्मिक चिंतन और व्यक्तिगत कल्याण के लिए हैं। ये चिकित्सा, मानसिक-स्वास्थ्य, कानूनी या वित्तीय सलाह का विकल्प नहीं हैं।',
  'about.services.label': 'सेवाएं',
  'about.services.title': 'आपकी अनूठी यात्रा के लिए सहायता',
  'about.services.desc': 'एक केंद्रित रीडिंग चुनें या अपनी वर्तमान अभिप्रेरा के अनुसार सत्र में क्षेत्रों को जोड़ें।',
  'about.services.reading.title': 'व्यक्तिगत अंकज्योतिष रीडिंग',
  'about.services.reading.desc': 'आपकी मूल संख्याओं, जीवन पथ, व्यक्तिगत चक्रों और उन विषयों की विचारशील रीडिंग जो चिंतन और स्पष्टता का समर्थन कर सकते हैं।',
  'about.services.name.title': 'नाम और व्यापार अंकज्योतिष',
  'about.services.name.desc': 'किसी नाम में ऊर्जात्मक पैटर्न का पता लगाएं, व्यक्तिगत, पेशेवर या व्यापार पहचान विकल्पों के लिए व्यावहारिक मार्गदर्शन के साथ।',
  'about.services.vedic.title': 'लो शु और वैदिक अंतर्दृष्टि',
  'about.services.vedic.desc': 'लो शु ग्रिड और वैदिक संख्या परंपराओं के माध्यम से पैटर्न की खोज करें, जिसमें शक्तियां, गायब संख्याएं और संतुलन अभ्यास शामिल हैं।',
  'about.services.aura.title': 'औरा शुद्धिकरण और ऊर्जा संतुलन',
  'about.services.aura.desc': 'शांति, स्थिरता और व्यक्तिगत स्थान के नवीनीकृत अर्थ को समर्थन देने के लिए कोमल, कल्याण-उन्मुख प्रथाएं।',
  'about.process.label': 'क्या उम्मीद करें',
  'about.process.title': 'एक स्पष्ट, व्यक्तिगत प्रक्रिया',
  'about.process.step1.title': 'अपना विवरण साझा करें',
  'about.process.step1.desc': 'अपना नाम और जन्म विवरण लाएं ताकि सत्र आपके लिए व्यक्तिगत हो सके।',
  'about.process.step2.title': 'अपनी रीडिंग प्राप्त करें',
  'about.process.step2.desc': 'एक शांत, सहायक बातचीत में अपनी संख्याओं और प्रश्नों का पता लगाएं।',
  'about.process.step3.title': 'संरेखित अगले कदम उठाएं',
  'about.process.step3.desc': 'चिंतन और रोज़मर्रा के जीवन में ले जाने के लिए सरल अभ्यासों के साथ जाएं।',
  'about.cta.title': 'अपनी संख्याओं से शुरू करें',
  'about.cta.desc': 'अपने मूल संख्या पैटर्न का पता लगाने के लिए ओम्नीअंकज्योतिष टूल का उपयोग करें, फिर सुप्रिया के साथ व्यक्तिगत सत्र में अपने प्रश्न लाएं।',
  'about.cta.button': 'मेरा अंकज्योतिष देखें',
};

const MR: StringMap = {
  'app.subtitle':
    'पायथागोरियन · काल्डियन · वैदिक · लो शू · कब्बालाह — एक एकीकृत अंकशास्त्रीय बुद्धिमत्ता इंजिन।',
  'form.title': 'जन्म प्रोफाइल',
  'form.fullName': 'पूर्ण जन्म नाव',
  'form.currentName': 'सध्याचे नाव',
  'form.birthDate': 'जन्मतारीख',
  'form.birthTime': 'जन्म वेळ',
  'form.birthCity': 'जन्म शहर',
  'form.day': 'दिवस',
  'form.month': 'महिना',
  'form.year': 'वर्ष',
  'form.targetDate': 'लक्ष्य तारीख',
  'form.calculate': 'मॅट्रिक्स मोजा',
  'form.calculating': 'मोजणी सुरू आहे…',
  'tabs.overview': 'आढावा',
  'tabs.wheel': 'मॅट्रिक्स चक्र',
  'tabs.loshu': 'लो शू',
  'tabs.clock': 'तास घड्याळ',
  'tabs.optimizer': 'नाव अनुकूलक',
  'tabs.energy': 'ऊर्जा',
  'tabs.synastry': 'सिनेस्ट्री',
  'tabs.oracle': 'ओरेकल',
  'badge.lifePath': 'जीवनमार्ग',
  'badge.expression': 'अभिव्यक्ती',
  'badge.driver': 'चालक',
  'badge.conductor': 'संचालक',
  'lang.label': 'भाषा',
  'pdf.download': 'PDF डाउनलोड करा',
  'pdf.generating': 'तयार करत आहे…',
  'pdf.error': 'PDF तयार करता आला नाही. कृपया पुन्हा प्रयत्न करा.',
  'report.title': 'ओमनीन्यूमरोलॉजी — अंकशास्त्र अहवाल',
  'report.generated': 'ओमनीन्यूमरोलॉजीद्वारे निर्मित',
  'card.strengths': 'सामर्थ्य',
  'card.challenges': 'आव्हाने',
  'card.careers': 'आदर्श मार्ग:',
  'core.title': 'मुख्य अंक',
  'core.subtitle':
    'पाच अंक पायथागोरियन गणनेचा पाया बनवतात — जीवनमार्ग (रस्ता), अभिव्यक्ती (वाहन), आत्म्याची इच्छा (इंधन), व्यक्तिमत्व (बाह्य रूप), आणि वाढदिवस (विशेष देणगी).',
  'core.lifePath': 'जीवनमार्ग',
  'core.expression': 'अभिव्यक्ती / नियती',
  'core.soulUrge': 'आत्म्याची इच्छा / हृदयाची इच्छा',
  'core.personality': 'व्यक्तिमत्व',
  'core.birthday': 'वाढदिवस अंक',
  'core.maturity': 'परिपक्वता अंक',
  'core.pinnaclesTitle': 'शिखरे आणि आव्हाने',
  'core.pinnaclesSubtitle':
    'चार शिखर चक्रे (आपल्या जीवनाच्या ऋतू) आणि चार आव्हान अंक (वाटेत एकात्म करावयाचे अडथळे).',
  'core.pinnacle': 'शिखर',
  'core.challenge': 'आव्हान',
  'core.untilAge': 'वय {age} पर्यंत',
  'core.vedicTitle': 'वैदिक — सांख्य शास्त्र',
  'core.vedicSubtitle':
    'मूलांक (मानसिक/चालक, आपल्या जन्म दिवसावरून) आणि भाग्यांक (नियती/संचालक, पूर्ण जन्मतारखेवरून), प्रत्येक एका ग्रहाद्वारे शासित.',
  'core.moolank': 'मूलांक (चालक)',
  'core.bhagyank': 'भाग्यांक (संचालक)',
  'core.driverConductor': 'चालक ↔ संचालक',
  'core.chaldeanTitle': 'काल्डियन आणि कब्बालाह',
  'core.chaldeanSubtitle':
    'काल्डियन आपल्या नावावरून एकल अंक आणि एक "संयुक्त" अंक (10-52) दोन्ही वाचतो; कब्बालाह त्याला जीवनवृक्षाच्या सेफिराशी जोडतो.',
  'core.chaldeanSingle': 'काल्डियन एकल (संयुक्त {compound})',
  'core.kabbalah': 'कब्बालाह',
  'core.compoundLabel': 'संयुक्त अंक {compound}',
  'core.favorable': 'शुभ',
  'core.cautionary': 'सावधान',
  'core.cyclesTitle': 'वैयक्तिक चक्रे',
  'core.cyclesSubtitle':
    'वैयक्तिक वर्ष, महिना आणि दिवस आपल्या सध्याच्या अनुभवाची वेळ सांगतात, जे आपल्या जन्मतारीख आणि लक्ष्य तारखेवरून मोजले जातात.',
  'core.personalYear': 'वैयक्तिक वर्ष',
  'core.personalMonth': 'वैयक्तिक महिना',
  'core.personalDay': 'वैयक्तिक दिवस',
  'core.energyTitle': 'ऊर्जा आणि उपचार',
  'core.energySubtitle':
    'प्रत्येक मुख्य अंकासाठी संक्षिप्त रेकी आणि आभा संदर्भ. संपूर्ण पंचतत्त्व संतुलन आणि शुद्धीकरण पद्धती ऊर्जा व उपचार टॅबमध्ये आहेत.',
  'wheel.howTo': 'हे चक्र कसे वाचावे',
  'wheel.description':
    'आतील वलय आपले पाच मुख्य अंक (जीवनमार्ग, अभिव्यक्ती, आत्म्याची इच्छा, व्यक्तिमत्व, वाढदिवस) दाखवते. बाहेरील वलय चार शिखर चक्रे दाखवते जी आपल्या जीवनाच्या ऋतू चिन्हांकित करतात.',
  'wheel.click': 'कोणत्याही भागावर क्लिक करून त्याचा तपशीलवार अर्थ पाहा.',
  'wheel.empty': 'चक्र पाहण्यासाठी आपले मॅट्रिक्स मोजा.',
  'loshu.title': 'लो शू जादूचा चौरस',
  'loshu.overall': 'एकूण',
  'loshu.active': 'सक्रिय',
  'loshu.present': 'उपस्थित अंक',
  'loshu.missing': 'अनुपस्थित अंक',
  'loshu.missingTitle': 'अनुपस्थित अंक आणि उपाय',
  'loshu.missingSubtitle':
    'प्रत्येक अनुपस्थित अंक जाणीवपूर्वक विकसित करावयाच्या ऊर्जेचा संकेत देतो. खालील उपाय ती स्पंदने संतुलित करण्याचे व्यावहारिक मार्ग आहेत.',
  'loshu.tattvaTitle': 'पंचतत्त्व — पाच तत्वे',
  'loshu.tattvaSubtitle':
    'ग्रिडमधील प्रत्येक अंक एका तत्त्वाशी संबंधित आहे. हे पाच-तत्व मॉडेल (अंक 5 साठी आकाशासह) एक संतुलन थर आहे — सिनेस्ट्री गणना चार-तत्व गट वापरते.',
  'loshu.numberTitle': 'अंक {n}',
  'energy.empty': 'ऊर्जा आणि उपचार उपाय पाहण्यासाठी आपले मॅट्रिक्स मोजा.',
  'energy.intro':
    'आपल्या मुख्य अंकांवरून तयार झालेला पूरक ऊर्जा थर: आपले पंचतत्त्व (पाच-तत्व) संतुलन, रेकी चक्र संरेखन आणि आभा-शुद्धी सराव. ही आध्यात्मिक कल्याण मार्गदर्शिका आहे — वैद्यकीय सल्ला नाही.',
  'energy.panchaTitle': 'पंचतत्त्व संतुलन',
  'energy.panchaSubtitle':
    'पाच तत्वे (पृथ्वी, जल, अग्नी, वायू, आकाश) आपल्या सात मुख्य अंकांत मोजली जातात. आकाशावर अंक 5 चे राज्य आहे.',
  'energy.dominant': 'प्रबळ',
  'energy.absent': 'अनुपस्थित',
  'energy.numbersLabel': 'अंक',
  'energy.dominantElement': 'प्रबळ तत्व: {element}.',
  'energy.dominantElements': 'प्रबळ तत्वे: {elements}.',
  'energy.absentElement':
    'आपल्या चार्टमध्ये {elements} चा कोणताही अंक नाही, त्यामुळे खालील पद्धतींनी ती ऊर्जा जाणीवपूर्वक संतुलित करा.',
  'energy.balanced': 'सर्व पाच तत्वे उपस्थित आहेत — नैसर्गिकरित्या संतुलित संरचना.',
  'energy.balancing': 'संतुलन',
  'energy.reikiTitle': 'रेकी चक्र संरेखन',
  'energy.reikiSubtitle': 'प्रत्येक मुख्य अंक एका चक्राशी आणि उसुई रेकी प्रतीकाशी गुंजतो.',
  'energy.symbol': 'प्रतीक',
  'energy.auraTitle': 'आभा शुद्धी',
  'energy.auraSubtitle': 'प्रत्येक मुख्य अंकाशी जुळलेला आपला आभा रंग आणि शुद्धीकरण सराव, तसेच दैनिक विधी.',
  'energy.dailyRitual': 'दैनिक आभा-शुद्धी विधी',
  'energy.wellness': 'आध्यात्मिक कल्याण मार्गदर्शन',
  'energy.notMedical': 'वैद्यकीय सल्ला नाही',
  'oracle.title': 'ओरेकल',
  'oracle.empty': 'ओरेकलचा सल्ला घेण्यासाठी आधी आपले मॅट्रिक्स मोजा.',
  'oracle.placeholder':
    'करिअर, प्रेम, वेळ, आपले नाव किंवा अनुपस्थित अंकांबद्दल विचारा. ओरेकल केवळ आपल्या मोजलेल्या अंकांवरून उत्तर देते.',
  'oracle.ask': 'विचारा',
  'oracle.stop': 'थांबवा',
  'oracle.inputPlaceholder': 'ओरेकलला विचारा…',
  'name.targetLabel': 'लक्ष्य नाव',
  'name.optimize': 'अनुकूलित करा',
  'name.optimizing': 'अनुकूलित होत आहे…',
  'name.chaldeanBadge': 'काल्डियन {single} / संयुक्त {compound}',
  'name.pythagoreanBadge': 'पायथागोरियन अभिव्यक्ती {n}',
  'name.chaldeanSingleLabel': 'काल्डियन एकल {n}',
  'name.compoundLabel': 'संयुक्त {n}',
  'name.alternatives': 'सकारात्मक पर्याय',
  'syn.memberName': 'सदस्य {i} नाव',
  'syn.analyze': 'टीमचे विश्लेषण करा',
  'syn.analyzing': 'विश्लेषण सुरू आहे…',
  'syn.addMember': 'सदस्य जोडा',
  'syn.teamTitle': 'टीम लो शू ({n} सदस्य)',
  'syn.compatibility': 'सुसंगतता {n}/100',
  'syn.strength': 'शक्ती {n}%',
  'syn.activePlanes': 'सक्रिय पातळ्या',
  'syn.missingPlanes': 'अनुपस्थित पातळ्या',
  'syn.missingCompetencies': 'अनुपस्थित सामूहिक क्षमता',
  'syn.enterTwo': 'किमान दोन प्रोफाइल प्रविष्ट करा.',
  'clock.empty': 'वैयक्तिक तास घड्याळ पाहण्यासाठी आपले मॅट्रिक्स मोजा.',
  'clock.now': 'आता',
  'clock.energyTip': 'ऊर्जा टीप',
  'clock.hour': 'तास',
  'clock.number': '#',
  'clock.theme': 'विषय',
  'clock.score': 'गुण',
  'oracle.coreHeading': 'मुख्य अंक',
  'oracle.coreLifePath': 'जीवनमार्ग {n}: {meaning}',
  'oracle.coreExpression': 'अभिव्यक्ती {n}: {meaning}',
  'oracle.coreSoulUrge': 'आत्म्याची इच्छा {n}: {meaning}',
  'oracle.coreVedic': 'वैदिक मूलांक {moolank} ({moolankPlanet}) आणि भाग्यांक {bhagyank} ({bhagyankPlanet}).',
  'oracle.vocationHeading': 'व्यवसाय आणि समृद्धी',
  'oracle.vocationExpression': 'तुमचा अभिव्यक्ती अंक {n} ({meaning}) तुमच्या नैसर्गिक व्यावसायिक सामर्थ्याला आकार देतो.',
  'oracle.vocationYear': 'वैयक्तिक वर्ष {n} चे मार्गदर्शन: {meaning}',
  'oracle.relationsHeading': 'नातेसंबंध',
  'oracle.relationsSoulUrge': 'तुमची आत्म्याची इच्छा {n} ({meaning}) सांगते की तुम्ही जोडीदारात खरोखर काय शोधता.',
  'oracle.relationsVedic': 'वैदिक प्रणालीत, तुमचा मूलांक {moolank} तुमच्या भाग्यांक {bhagyank} प्रती {relation} आहे.',
  'oracle.timingHeading': 'वेळ',
  'oracle.timingYear': 'वैयक्तिक वर्ष {n}: {meaning}',
  'oracle.timingMonthDay': 'वैयक्तिक महिना {month} आणि वैयक्तिक दिवस {day} आजची लय ठरवतात.',
  'oracle.nameHeading': 'नाव विश्लेषण',
  'oracle.nameCurrent': 'तुमच्या सध्याच्या नावात काल्डियन एकल अंक {single} आणि संयुक्त अंक {compound}{meaning} आहे.',
  'oracle.nameCautionary': 'हा संयुक्त अंक पारंपरिकपणे सावधगिरीचा संकेत आहे; सकारात्मक संयुक्ताकडे नेण्यासाठी स्पेलिंग बदलाचा विचार करा.',
  'oracle.nameFavorable': 'हा संयुक्त अंक पारंपरिकपणे शुभ मानला जातो.',
  'oracle.loshuHeading': 'लो शू अंतर आणि उपाय',
  'oracle.loshuMissing': 'अनुपस्थित अंक: {list}.',
  'oracle.loshuNone': 'तुमच्या लो शू ग्रिडमध्ये कोणताही अंक अनुपस्थित नाही.',
  'oracle.energyHeading': 'ऊर्जा आणि उपचार',
  'oracle.energyBalance': 'तुमच्या मुख्य अंकांत पंचतत्त्व संतुलन: {balance}.',
  'oracle.energyAbsent': 'अनुपस्थित तत्वे: {elements}. {practices}',
  'oracle.energyBalanced': 'तुमच्या चार्टमध्ये सर्व पाच तत्वे उपस्थित आहेत.',
  'oracle.energyReiki': 'जीवनमार्ग {n} {chakra} शी गुंजतो, प्रतीक {symbol} — {focus}',
  'oracle.energyAura': 'तुमची आभा {color} कडे झुकते. {practice}',
  'oracle.energyDaily': 'दैनिक विधी: {ritual}',
  'oracle.generalHeading': 'सामान्य वाचन',
  'oracle.generalYear': 'वैयक्तिक वर्ष {n}: {meaning}',
  'oracle.generalDay': 'आज वैयक्तिक दिवस {day} आहे; तासांच्या खिडक्या तुमच्या वैयक्तिक तास घड्याळात दाखवल्या आहेत.',
  'assistant.title': 'अंकशास्त्र मार्गदर्शक',
  'assistant.subtitle': 'मला टॅब, अंकशास्त्र, ग्रह, रेकी किंवा पंचतत्त्व याबद्दल विचारा.',
  'assistant.placeholder': 'प्रश्न विचारा…',
  'assistant.send': 'विचारा',
  'assistant.stop': 'थांबवा',
  'assistant.clear': 'साफ करा',
  'assistant.suggestTitle': 'विचारून पहा:',
  'assistant.suggest.tabs': 'टॅबचा अर्थ काय?',
  'assistant.suggest.numerology': 'माझा जीवनमार्ग अंक कोणता?',
  'assistant.suggest.reiki': 'रेकी कसे कार्य करते?',
  'assistant.suggest.panchatatva': 'पंचतत्त्व म्हणजे काय?',
  'assistant.suggest.planets': 'प्रत्येक अंकावर कोणता ग्रह राज्य करतो?',
  'assistant.open': 'सहाय्यक उघडा',
  'assistant.close': 'सहाय्यक बंद करा',
  'about.hero.badge': 'अंकज्योतिष और औरा शुद्धीकरण',
  'about.hero.title': 'मार्गदर्शन जे तुम्हाला तुमच्या अंतर्गत दिशेशी पुन्हा जोडते.',
  'about.hero.welcome': 'स्वागत आहे — मी',
  'about.hero.name': 'सुप्रिया तांबे',
  'about.hero.desc': 'अंकज्योतिष आणि औरा शुद्धीकरणाद्वारे, मी चिंतन, स्वतःच्या समजुनी आणि जाणूनबुजून पुढच्या पावलांसाठी एक शांत जागा प्रदान करते.',
  'about.hero.exploreServices': 'सेवा पहा',
  'about.hero.useTool': 'अंकज्योतिष साधन वापरून पहा',
  'about.card.title': 'एक विचारशील, स्थिर दृष्टिकोन',
  'about.card.p1': 'सुप्रिया यांनी अंकज्योतिष आणि औरा शुद्धीकरणातील प्रशिक्षण पूर्ण केले आहे. त्यांचा अभ्यास या परंपरांना लक्षपूर्वक ऐकण्यासह आणि व्यवहार्य, दररोजच्या चिंतनासह जोडतो.',
  'about.card.p2': 'प्रत्येक सत्र वैयक्तिक, गोपनीय असते, आणि तुमच्यासाठी सर्वात महत्त्वाच्या प्रश्नांवर केंद्रित असते.',
  'about.card.disclaimer': 'ही सेवा आध्यात्मिक चिंतन आणि वैयक्तिक कल्याणासाठी आहेत. ती वैद्यकीय, मानसिक-आरोग्य, कायदेशीर किंवा आर्थिक सल्ल्याचा पर्याय नाहीत.',
  'about.services.label': 'सेवा',
  'about.services.title': 'तुमच्या अद्वितीय प्रवासासाठी सहाय्य',
  'about.services.desc': 'एक केंद्रित रीडिंग निवडा किंवा तुमच्या सध्याच्या इच्छेनुसार सत्रात क्षेत्रे जोडा.',
  'about.services.reading.title': 'वैयक्तिक अंकज्योतिष रीडिंग',
  'about.services.reading.desc': 'तुमच्या मूळ संख्या, जीवन मार्ग, वैयक्तिक चक्र आणि त्या विषयांचे विचारशील वाचन जे चिंतन आणि स्पष्टता यांना समर्थन देऊ शकतात.',
  'about.services.name.title': 'नाव आणि व्यवसाय अंकज्योतिष',
  'about.services.name.desc': 'नावातील ऊर्जात्मक नमुने शोधा, वैयक्तिक, व्यावसायिक किंवा व्यवसाय ओळख पर्यायांसाठी व्यवहार्य मार्गदर्शनासह.',
  'about.services.vedic.title': 'लो शु आणि वैदिक अंतर्दृष्टी',
  'about.services.vedic.desc': 'लो शु ग्रिड आणि वैदिक संख्या परंपरांद्वारे नमुने शोधा, ज्यात शक्ती, गायब संख्या आणि संतुलन सराव समाविष्ट आहेत.',
  'about.services.aura.title': 'औरा शुद्धीकरण आणि ऊर्जा संतुलन',
  'about.services.aura.desc': 'शांतता, स्थिरता आणि वैयक्तिक जागेच्या नवीनीकृत भावनेला समर्थन देण्यासाठी कोमल, कल्याण-केंद्रित सराव.',
  'about.process.label': 'काय अपेक्षा करावी',
  'about.process.title': 'एक स्पष्ट, वैयक्तिक प्रक्रिया',
  'about.process.step1.title': 'तुमचा तपशील सामायिक करा',
  'about.process.step1.desc': 'सत्र तुमच्यासाठी वैयक्तिक असल्यास तुमचे नाव आणि जन्मतारीख आणा.',
  'about.process.step2.title': 'तुमची रीडिंग मिळवा',
  'about.process.step2.desc': 'एका शांत, आधारभूत संवादात तुमच्या संख्या आणि प्रश्नांचा शोध लावा.',
  'about.process.step3.title': 'जुळलेले पुढचे पावले उचला',
  'about.process.step3.desc': 'चिंतन आणि दररोजच्या जीवनात नेण्यासाठी सोप्या सरावांसह जा.',
  'about.cta.title': 'तुमच्या संख्यांसह सुरू करा',
  'about.cta.desc': 'तुमचे मूळ संख्या नमुने शोधण्यासाठी ओम्नीअंकज्योतिष साधन वापरा, मग सुप्रिया यांच्यासोबत वैयक्तिक सत्रात तुमचे प्रश्न आणा.',
  'about.cta.button': 'माझे अंकज्योतिष पहा',
};

export const UI_STRINGS: Record<Language, StringMap> = { en: EN, hi: HI, mr: MR };

/** Translate a UI key for the given language, with optional `{var}` interpolation. */
export function translate(
  language: Language,
  key: UiKey,
  vars?: Record<string, string | number>,
): string {
  const template = UI_STRINGS[language][key] ?? UI_STRINGS.en[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] != null ? String(vars[name]) : `{${name}}`,
  );
}
