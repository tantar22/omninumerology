/**
 * Assistant knowledge base — structured, localized reference content that powers
 * the in-app AI assistant's local (deterministic) answers.
 *
 * Every entry covers a topic in the OmniNumerology universe: app tabs and their
 * terminology, numerology systems, Vedic/planetary astrology, Reiki, Panchatatva,
 * aura, and synastry. All interpretive copy is wellness-toned and explicitly not
 * medical advice.
 */
import type { Language } from './i18n';

export interface LocalizedText {
  en: string;
  hi: string;
  mr: string;
}

export interface KnowledgeEntry {
  id: string;
  topic: string;
  /** Language-agnostic anchors (English + common transliterations). */
  keywords: string[];
  title: LocalizedText;
  body: LocalizedText;
}

export const WELLNESS_DISCLAIMER: LocalizedText = {
  en: 'This guidance is for self-reflection and entertainment only. It is not medical, legal, or financial advice. Always consult a qualified professional for health or major life decisions.',
  hi: 'यह मार्गदर्शन केवल आत्म-चिंतन और मनोरंजन के लिए है। यह चिकित्सा, कानूनी या वित्तीय सलाह नहीं है। स्वास्थ्य या बड़े जीवन निर्णयों के लिए हमेशा योग्य विशेषज्ञ से परामर्श करें।',
  mr: 'हे मार्गदर्शन केवळ आत्मचिंतन आणि मनोरंजनासाठी आहे. ही वैद्यकीय, कायदेशीर किंवा आर्थिक सल्ला नाही. आरोग्य किंवा मोठ्या जीवन निर्णयांसाठी नेहमी पात्र तज्ज्ञांचा सल्ला घ्या.',
};

export const KNOWLEDGE_TOPICS = [
  'app',
  'numerology',
  'vedic',
  'chaldean',
  'kabbalah',
  'loshu',
  'reiki',
  'panchatatva',
  'aura',
  'synastry',
  'wellness',
] as const;

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'app-overview',
    topic: 'app',
    keywords: ['overview', 'tab', 'core numbers', 'summary', 'dashboard', 'app'],
    title: { en: 'Overview tab', hi: 'अवलोकन टैब', mr: 'आढावा टॅब' },
    body: {
      en: 'The Overview tab is your dashboard. It summarizes your core numbers (Life Path, Expression, Soul Urge, Personality, Birthday), the Vedic Moolank and Bhagyank, and the Chaldean and Kabbalah readings in one place.',
      hi: 'अवलोकन टैब आपका डैशबोर्ड है। यह आपके मुख्य अंकों (जीवन पथ, अभिव्यक्ति, आत्मा की चाह, व्यक्तित्व, जन्म अंक), वैदिक मूलांक और भाग्यांक तथा काल्डियन और कब्बाला गणनाओं को एक स्थान पर सारांशित करता है।',
      mr: 'आढावा टॅब म्हणजे तुमचे डॅशबोर्ड. तो तुमचे मुख्य अंक (जीवनमार्ग, अभिव्यक्ती, आत्म्याची इच्छा, व्यक्तिमत्त्व, जन्म अंक), वैदिक मूलांक आणि भाग्यांक तसेच काल्डियन आणि कब्बाला वाचन एकाच ठिकाणी सारांशित करतो.',
    },
  },
  {
    id: 'app-wheel',
    topic: 'app',
    keywords: ['wheel', 'matrix wheel', 'tab', 'visual', 'chakra', 'diagram'],
    title: { en: 'Matrix Wheel tab', hi: 'मैट्रिक्स व्हील टैब', mr: 'मॅट्रिक्स व्हील टॅब' },
    body: {
      en: 'The Matrix Wheel shows your core numbers arranged around a wheel, with the Life Path at the center and Expression, Soul Urge, Personality, and Pinnacle numbers around it. It is a visual map of how your numbers relate.',
      hi: 'मैट्रिक्स व्हील आपके मुख्य अंकों को एक चक्र के चारों ओर दिखाता है, जिसमें जीवन पथ केंद्र में और अभिव्यक्ति, आत्मा की चाह, व्यक्तित्व तथा शिखर अंक उसके चारों ओर होते हैं। यह आपके अंकों के संबंधों का दृश्य मानचित्र है।',
      mr: 'मॅट्रिक्स व्हील तुमचे मुख्य अंक एका चक्राभोवती दाखवते, ज्यात जीवनमार्ग मध्यभागी आणि अभिव्यक्ती, आत्म्याची इच्छा, व्यक्तिमत्त्व आणि शिखर अंक भोवती असतात. ते तुमच्या अंकांच्या संबंधांचा दृश्य नकाशा आहे.',
    },
  },
  {
    id: 'app-loshu',
    topic: 'app',
    keywords: ['loshu', 'lo shu', 'grid', 'tab', 'magic square', 'missing'],
    title: { en: 'Lo Shu Grid tab', hi: 'लो शू ग्रिड टैब', mr: 'लो शू ग्रिड टॅब' },
    body: {
      en: 'The Lo Shu Grid tab maps your birth-date numbers onto the 3x3 Lo Shu magic square. It reveals which numbers are present, which are missing, and suggests remedies and lifestyle practices for balance.',
      hi: 'लो शू ग्रिड टैब आपकी जन्मतिथि के अंकों को 3x3 लो शू जादुई वर्ग पर रखता है। यह दिखाता है कि कौन से अंक उपस्थित हैं, कौन से अनुपस्थित हैं, और संतुलन के लिए उपाय व जीवनशैली अभ्यास सुझाता है।',
      mr: 'लो शू ग्रिड टॅब तुमच्या जन्मतारखेचे अंक 3x3 लो शू जादूच्या चौकोनावर ठेवतो. कोणते अंक आहेत, कोणते नाहीत हे दाखवतो आणि संतुलनासाठी उपाय व जीवनशैली सराव सुचवतो.',
    },
  },
  {
    id: 'app-clock',
    topic: 'app',
    keywords: ['clock', 'hour', 'personal hour', 'tab', 'timing', 'microtiming'],
    title: { en: 'Personal Hour Clock tab', hi: 'व्यक्तिगत घंटा घड़ी टैब', mr: 'वैयक्तिक तास घड्याळ टॅब' },
    body: {
      en: 'The Personal Hour Clock tab divides your day into personal hours, each ruled by a number. Use it to time important actions — calls, launches, rest — to the hour energy that best supports them.',
      hi: 'व्यक्तिगत घंटा घड़ी टैब आपके दिन को व्यक्तिगत घंटों में बांटता है, जिनमें प्रत्येक पर एक अंक का शासन होता है। महत्वपूर्ण कार्यों — कॉल, शुभारंभ, विश्राम — को उस घंटे की ऊर्जा के अनुसार समय देने के लिए इसका उपयोग करें।',
      mr: 'वैयक्तिक तास घड्याळ टॅब तुमचा दिवस वैयक्तिक तासांमध्ये विभागतो, प्रत्येकावर एक अंकाचे राज्य असते. महत्त्वाच्या कृती — कॉल, सुरुवात, विश्रांती — यांना आधार देणाऱ्या तास ऊर्जेनुसार वेळ देण्यासाठी वापरा.',
    },
  },
  {
    id: 'app-optimizer',
    topic: 'app',
    keywords: ['optimizer', 'name', 'spelling', 'tab', 'chaldean', 'suggest'],
    title: { en: 'Name Optimizer tab', hi: 'नाम अनुकूलक टैब', mr: 'नाव ऑप्टिमायझर टॅब' },
    body: {
      en: 'The Name Optimizer scores your current name using Chaldean numerology and suggests spelling adjustments that shift its compound number toward a more favorable, positive vibration.',
      hi: 'नाम अनुकूलक आपके वर्तमान नाम को काल्डियन अंकज्योतिष से स्कोर करता है और ऐसे वर्तनी बदलाव सुझाता है जो उसके यौगिक अंक को अधिक शुभ, सकारात्मक कंपन की ओर ले जाएं।',
      mr: 'नाव ऑप्टिमायझर काल्डियन अंकशास्त्राने तुमच्या सध्याच्या नावाला गुण देते आणि त्याचा संयुक्त अंक अधिक शुभ, सकारात्मक कंपनाकडे नेणारे स्पेलिंग बदल सुचवते.',
    },
  },
  {
    id: 'app-energy',
    topic: 'app',
    keywords: ['energy', 'remedies', 'tab', 'reiki', 'aura', 'panchatatva', 'healing'],
    title: { en: 'Energy & Remedies tab', hi: 'ऊर्जा और उपाय टैब', mr: 'ऊर्जा आणि उपाय टॅब' },
    body: {
      en: 'The Energy tab combines Panchatatva element balance, Reiki chakra insights, and aura-cleansing practices. It offers gentle, non-medical self-care rituals tailored to your core numbers.',
      hi: 'ऊर्जा टैब पंचतत्त्व तत्व संतुलन, रेकी चक्र अंतर्दृष्टि और आभा-शुद्धि अभ्यासों को जोड़ता है। यह आपके मुख्य अंकों के अनुरूप कोमल, गैर-चिकित्सकीय स्व-देखभाल अनुष्ठान प्रस्तुत करता है।',
      mr: 'ऊर्जा टॅब पंचतत्त्व संतुलन, रेकी चक्र अंतर्दृष्टी आणि आभा-शुद्धी सराव एकत्र करतो. तुमच्या मुख्य अंकांनुसार सौम्य, गैर-वैद्यकीय स्व-काळजी विधी देतो.',
    },
  },
  {
    id: 'app-synastry',
    topic: 'app',
    keywords: ['synastry', 'compatibility', 'tab', 'relationship', 'love', 'match'],
    title: { en: 'Synastry Matrix tab', hi: 'सिनैस्ट्री मैट्रिक्स टैब', mr: 'सिनॅस्ट्री मॅट्रिक्स टॅब' },
    body: {
      en: 'The Synastry Matrix compares two people\u2019s numbers to score compatibility across fire, earth, air, and water dimensions. It is a reflective tool, not a verdict on any relationship.',
      hi: 'सिनैस्ट्री मैट्रिक्स दो लोगों के अंकों की तुलना कर अग्नि, पृथ्वी, वायु और जल आयामों में अनुकूलता का स्कोर करता है। यह एक चिंतन उपकरण है, किसी संबंध पर फैसला नहीं।',
      mr: 'सिनॅस्ट्री मॅट्रिक्स दोन व्यक्तींच्या अंकांची तुलना करून अग्नी, पृथ्वी, वायू आणि जल आयामांत अनुकूलतेचे गुण देते. हे चिंतनाचे साधन आहे, कोणत्याही नात्यावर निर्णय नाही.',
    },
  },
  {
    id: 'app-oracle',
    topic: 'app',
    keywords: ['oracle', 'tab', 'chat', 'reading', 'ask', 'guidance'],
    title: { en: 'Oracle Chat tab', hi: 'ओरेकल चैट टैब', mr: 'ओरॅकल चॅट टॅब' },
    body: {
      en: 'The Oracle Chat answers questions strictly from your already-computed chart — career, relationships, timing, names, and energy. It never invents content beyond your numbers.',
      hi: 'ओरेकल चैट आपके पहले से गणित चार्ट से ही प्रश्नों के उत्तर देता है — करियर, संबंध, समय, नाम और ऊर्जा। यह आपके अंकों से परे कोई सामग्री नहीं गढ़ता।',
      mr: 'ओरॅकल चॅट तुमच्या आधीच मोजलेल्या चार्टवरूनच प्रश्नांची उत्तरे देते — करिअर, नाती, वेळ, नावे आणि ऊर्जा. ते तुमच्या अंकांच्या पलीकडे कोणतीही माहिती रचत नाही.',
    },
  },
  {
    id: 'num-core',
    topic: 'numerology',
    keywords: ['core numbers', 'life path', 'expression', 'soul urge', 'personality', 'birthday', 'what are'],
    title: { en: 'Core numbers', hi: 'मुख्य अंक', mr: 'मुख्य अंक' },
    body: {
      en: 'Your core numbers are the five pillars of a numerology chart: Life Path (your purpose), Expression (your talents), Soul Urge (your inner motivation), Personality (how others see you), and Birthday (a specific gift you carry).',
      hi: 'आपके मुख्य अंक अंकज्योतिष चार्ट के पाँच स्तंभ हैं: जीवन पथ (आपका उद्देश्य), अभिव्यक्ति (आपकी प्रतिभाएँ), आत्मा की चाह (आपकी आंतरिक प्रेरणा), व्यक्तित्व (दूसरे आपको कैसे देखते हैं) और जन्म अंक (आपकी एक विशेष प्रतिभा)।',
      mr: 'तुमचे मुख्य अंक म्हणजे अंकशास्त्र चार्टचे पाच स्तंभ: जीवनमार्ग (तुमचा उद्देश), अभिव्यक्ती (तुमची कौशल्ये), आत्म्याची इच्छा (तुमची अंतर्गत प्रेरणा), व्यक्तिमत्त्व (इतर तुम्हाला कसे पाहतात) आणि जन्म अंक (तुमची एक विशेष देणगी).',
    },
  },
  {
    id: 'num-life-path',
    topic: 'numerology',
    keywords: ['life path', 'purpose', 'destiny', 'birth date', 'path number'],
    title: { en: 'Life Path Number', hi: 'जीवन पथ अंक', mr: 'जीवनमार्ग अंक' },
    body: {
      en: 'The Life Path Number is derived from your full birth date and is considered the most important number. It describes your life purpose, natural strengths, and the themes you will meet on your journey.',
      hi: 'जीवन पथ अंक आपकी पूर्ण जन्मतिथि से निकाला जाता है और इसे सबसे महत्वपूर्ण अंक माना जाता है। यह आपके जीवन उद्देश्य, स्वाभाविक शक्तियों और आपकी यात्रा में आने वाले विषयों का वर्णन करता है।',
      mr: 'जीवनमार्ग अंक तुमच्या संपूर्ण जन्मतारखेवरून काढला जातो आणि सर्वात महत्त्वाचा अंक मानला जातो. तो तुमचा जीवन उद्देश, नैसर्गिक सामर्थ्य आणि प्रवासातील विषयांचे वर्णन करतो.',
    },
  },
  {
    id: 'num-expression',
    topic: 'numerology',
    keywords: ['expression', 'destiny number', 'talent', 'full name', 'abilities'],
    title: { en: 'Expression (Destiny) Number', hi: 'अभिव्यक्ति (भाग्य) अंक', mr: 'अभिव्यक्ती (नियती) अंक' },
    body: {
      en: 'The Expression Number comes from the letters of your full birth name. It reveals your natural talents, abilities, and how you are wired to express yourself in the world.',
      hi: 'अभिव्यक्ति अंक आपके पूर्ण जन्म नाम के अक्षरों से आता है। यह आपकी स्वाभाविक प्रतिभाओं, क्षमताओं और दुनिया में खुद को अभिव्यक्त करने के तरीके को प्रकट करता है।',
      mr: 'अभिव्यक्ती अंक तुमच्या संपूर्ण जन्म नावाच्या अक्षरांतून येतो. तो तुमची नैसर्गिक कौशल्ये, क्षमता आणि जगात स्वतःला व्यक्त करण्याची पद्धत दाखवतो.',
    },
  },
  {
    id: 'num-soul-urge',
    topic: 'numerology',
    keywords: ['soul urge', "heart's desire", 'vowels', 'motivation', 'inner'],
    title: { en: 'Soul Urge Number', hi: 'आत्मा की चाह अंक', mr: 'आत्म्याची इच्छा अंक' },
    body: {
      en: 'The Soul Urge (or Heart\u2019s Desire) Number is calculated from the vowels in your name. It reveals what truly motivates you, what you yearn for, and what makes you feel fulfilled.',
      hi: 'आत्मा की चाह अंक आपके नाम के स्वरों से निकाला जाता है। यह बताता है कि वास्तव में आपको क्या प्रेरित करता है, आप किसकी चाह रखते हैं और किससे संतुष्टि मिलती है।',
      mr: 'आत्म्याची इच्छा अंक तुमच्या नावातील स्वरांवरून काढला जातो. तुम्हाला खरोखर कशामुळे प्रेरणा मिळते, तुम्हाला कशाची ओढ आहे आणि कशाने समाधान मिळते हे तो दाखवतो.',
    },
  },
  {
    id: 'num-personality',
    topic: 'numerology',
    keywords: ['personality', 'consonants', 'outer', 'impression', 'others see'],
    title: { en: 'Personality Number', hi: 'व्यक्तित्व अंक', mr: 'व्यक्तिमत्त्व अंक' },
    body: {
      en: 'The Personality Number is calculated from the consonants in your name. It represents the outer impression you make and how others tend to perceive you on first meeting.',
      hi: 'व्यक्तित्व अंक आपके नाम के व्यंजनों से निकाला जाता है। यह उस बाहरी प्रभाव को दर्शाता है जो आप बनाते हैं और पहली मुलाकात में दूसरे आपको कैसे देखते हैं।',
      mr: 'व्यक्तिमत्त्व अंक तुमच्या नावातील व्यंजनांवरून काढला जातो. तुम्ही निर्माण केलेली बाह्य छाप आणि पहिल्या भेटीत इतर तुम्हाला कसे पाहतात हे तो दर्शवतो.',
    },
  },
  {
    id: 'num-birthday',
    topic: 'numerology',
    keywords: ['birthday number', 'day of birth', 'gift', 'special talent'],
    title: { en: 'Birthday Number', hi: 'जन्म अंक', mr: 'जन्म अंक' },
    body: {
      en: 'The Birthday Number is simply the day of the month you were born. It points to a specific gift, skill, or quality that supports your Life Path.',
      hi: 'जन्म अंक केवल आपके जन्म के महीने का दिन है। यह उस विशेष प्रतिभा, कौशल या गुण की ओर संकेत करता है जो आपके जीवन पथ का समर्थन करता है।',
      mr: 'जन्म अंक म्हणजे तुमचा जन्म महिन्यातील दिवस. तुमच्या जीवनमार्गाला आधार देणारी विशिष्ट देणगी, कौशल्य किंवा गुण दाखवतो.',
    },
  },
  {
    id: 'num-master',
    topic: 'numerology',
    keywords: ['master numbers', '11', '22', '33', 'master', 'double digit'],
    title: { en: 'Master Numbers (11, 22, 33)', hi: 'मास्टर अंक (11, 22, 33)', mr: 'मास्टर अंक (11, 22, 33)' },
    body: {
      en: 'Master Numbers 11, 22, and 33 are not reduced to a single digit. They carry a higher vibration: 11 for intuition and insight, 22 for building and manifestation, 33 for compassionate teaching.',
      hi: 'मास्टर अंक 11, 22 और 33 को एक अंक तक नहीं घटाया जाता। इनमें उच्च कंपन होता है: 11 अंतर्ज्ञान और अंतर्दृष्टि के लिए, 22 निर्माण और अभिव्यक्ति के लिए, 33 करुणामय शिक्षण के लिए।',
      mr: 'मास्टर अंक 11, 22 आणि 33 हे एका अंकापर्यंत घटवले जात नाहीत. त्यांचे उच्च कंपन असते: 11 अंतर्ज्ञान आणि अंतर्दृष्टीसाठी, 22 निर्मिती आणि प्रकटीकरणासाठी, 33 करुणामय शिकवणीसाठी.',
    },
  },
  {
    id: 'num-karmic',
    topic: 'numerology',
    keywords: ['karmic', 'debt', '13', '14', '16', '19', 'karma'],
    title: { en: 'Karmic Debt Numbers', hi: 'कर्म ऋण अंक', mr: 'कर्म ऋण अंक' },
    body: {
      en: 'Karmic Debt Numbers (13, 14, 16, 19) indicate lessons carried forward that ask for extra awareness and effort. They are not punishments — they are invitations to grow and do better.',
      hi: 'कर्म ऋण अंक (13, 14, 16, 19) आगे लाए गए उन पाठों को दर्शाते हैं जो अतिरिक्त जागरूकता और प्रयास मांगते हैं। ये दंड नहीं हैं — ये विकसित होने और बेहतर करने का निमंत्रण हैं।',
      mr: 'कर्म ऋण अंक (13, 14, 16, 19) पुढे आणलेले असे धडे दाखवतात ज्यांना अधिक जागरूकता आणि प्रयत्न लागतो. ती शिक्षा नाहीत — ती वाढण्याचे आणि चांगले करण्याचे आमंत्रण आहेत.',
    },
  },
  {
    id: 'num-pinnacles',
    topic: 'numerology',
    keywords: ['pinnacles', 'challenges', 'cycles', 'stages', 'periods'],
    title: { en: 'Pinnacles and Challenges', hi: 'शिखर और चुनौतियाँ', mr: 'शिखरे आणि आव्हाने' },
    body: {
      en: 'Pinnacles are four long cycles of your life, each with its own number and lesson. Challenges are the obstacles paired with each Pinnacle that help you build the strength to overcome them.',
      hi: 'शिखर आपके जीवन के चार लंबे चक्र हैं, प्रत्येक का अपना अंक और पाठ होता है। चुनौतियाँ प्रत्येक शिखर के साथ जुड़ी बाधाएँ हैं जो आपको उन्हें पार करने की शक्ति बनाने में मदद करती हैं।',
      mr: 'शिखरे म्हणजे तुमच्या आयुष्याचे चार लांब चक्र, प्रत्येकाचा स्वतःचा अंक आणि धडा असतो. आव्हाने म्हणजे प्रत्येक शिखराशी जोडलेले अडथळे जे तुम्हाला त्यांवर मात करण्याची शक्ती मिळवण्यास मदत करतात.',
    },
  },
  {
    id: 'num-personal-year',
    topic: 'numerology',
    keywords: ['personal year', 'personal month', 'personal day', 'cycle', 'timing'],
    title: { en: 'Personal Year, Month, and Day', hi: 'व्यक्तिगत वर्ष, माह और दिन', mr: 'वैयक्तिक वर्ष, महिना आणि दिवस' },
    body: {
      en: 'Your Personal Year runs from one birthday to the next and sets the theme of a 9-year cycle. The Personal Month and Personal Day refine that theme to help you time decisions and actions.',
      hi: 'आपका व्यक्तिगत वर्ष एक जन्मदिन से अगले तक चलता है और 9-वर्षीय चक्र का विषय निर्धारित करता है। व्यक्तिगत माह और व्यक्तिगत दिन निर्णयों और कार्यों का समय तय करने में सहायता करते हैं।',
      mr: 'तुमचे वैयक्तिक वर्ष एका वाढदिवसापासून पुढच्यापर्यंत चालते आणि 9-वर्षीय चक्राचा विषय ठरवते. वैयक्तिक महिना आणि वैयक्तिक दिवस निर्णय व कृतींची वेळ ठरवण्यास मदत करतात.',
    },
  },
  {
    id: 'vedic-basics',
    topic: 'vedic',
    keywords: ['vedic', 'sankhya', 'moolank', 'bhagyank', 'driver', 'conductor', 'indian'],
    title: { en: 'Vedic Numerology (Sankhya Shastra)', hi: 'वैदिक अंकज्योतिष (सांख्य शास्त्र)', mr: 'वैदिक अंकशास्त्र (सांख्य शास्त्र)' },
    body: {
      en: 'Vedic numerology, or Sankhya Shastra, reduces every number to a single digit (1-9). The Moolank (driver) comes from your day of birth; the Bhagyank (conductor) comes from the full birth date.',
      hi: 'वैदिक अंकज्योतिष या सांख्य शास्त्र हर अंक को एक अंक (1-9) तक घटाता है। मूलांक (चालक) आपके जन्म के दिन से और भाग्यांक (संवाहक) पूर्ण जन्मतिथि से आता है।',
      mr: 'वैदिक अंकशास्त्र किंवा सांख्य शास्त्र प्रत्येक अंक एका अंकापर्यंत (1-9) घटवते. मूलांक (चालक) तुमच्या जन्मदिवसांवरून आणि भाग्यांक (संवाहक) संपूर्ण जन्मतारखेवरून येतो.',
    },
  },
  {
    id: 'vedic-planets',
    topic: 'vedic',
    keywords: ['planet', 'planets', 'ruling planet', 'sun', 'moon', 'mercury', 'venus', 'mars', 'saturn', 'rahu', 'ketu', 'astrology', 'astronomy'],
    title: { en: 'Planetary associations', hi: 'ग्रह संबंध', mr: 'ग्रह संबंध' },
    body: {
      en: 'Each number 1-9 is ruled by a planet: 1 Sun, 2 Moon, 3 Jupiter, 4 Rahu, 5 Mercury, 6 Venus, 7 Ketu, 8 Saturn, 9 Mars. This links numerology with classical astrology, though it remains a symbolic, reflective system rather than a scientific one.',
      hi: 'प्रत्येक अंक 1-9 पर एक ग्रह का शासन है: 1 सूर्य, 2 चंद्र, 3 बृहस्पति, 4 राहु, 5 बुध, 6 शुक्र, 7 केतु, 8 शनि, 9 मंगल। यह अंकज्योतिष को शास्त्रीय ज्योतिष से जोड़ता है, हालांकि यह वैज्ञानिक नहीं बल्कि प्रतीकात्मक, चिंतन प्रणाली है।',
      mr: 'प्रत्येक अंक 1-9 वर एका ग्रहाचे राज्य आहे: 1 सूर्य, 2 चंद्र, 3 गुरु, 4 राहू, 5 बुध, 6 शुक्र, 7 केतू, 8 शनि, 9 मंगळ. हे अंकशास्त्राला शास्त्रीय ज्योतिषाशी जोडते, तरीही ती वैज्ञानिक नसून प्रतीकात्मक, चिंतन प्रणाली आहे.',
    },
  },
  {
    id: 'vedic-relations',
    topic: 'vedic',
    keywords: ['mitra', 'shatru', 'sama', 'friend', 'enemy', 'neutral', 'relationship', 'driver conductor'],
    title: { en: 'Mitra, Shatru, and Sama', hi: 'मित्र, शत्रु और सम', mr: 'मित्र, शत्रू आणि सम' },
    body: {
      en: 'Vedic numerology classifies the relationship between two numbers as Mitra (friend), Shatru (enemy), or Sama (neutral), based on classical planetary friendships. It is used to reflect on compatibility between your Moolank and Bhagyank.',
      hi: 'वैदिक अंकज्योतिष दो अंकों के संबंध को शास्त्रीय ग्रह मित्रता के आधार पर मित्र, शत्रु या सम के रूप में वर्गीकृत करता है। इसका उपयोग आपके मूलांक और भाग्यांक के बीच अनुकूलता पर चिंतन के लिए किया जाता है।',
      mr: 'वैदिक अंकशास्त्र दोन अंकांतील संबंध शास्त्रीय ग्रह मैत्रीच्या आधारे मित्र, शत्रू किंवा सम असे वर्गीकृत करते. तुमच्या मूलांक आणि भाग्यांक यांच्यातील अनुकूलतेवर चिंतनासाठी वापरले जाते.',
    },
  },
  {
    id: 'chaldean-basics',
    topic: 'chaldean',
    keywords: ['chaldean', 'compound number', 'single number', 'letter value', 'ancient'],
    title: { en: 'Chaldean Numerology', hi: 'काल्डियन अंकज्योतिष', mr: 'काल्डियन अंकशास्त्र' },
    body: {
      en: 'Chaldean numerology, rooted in ancient Babylon, assigns each letter a vibration from 1-8 (9 is reserved). Names are reduced to a single number and a compound number (10-52), each with its own traditional meaning.',
      hi: 'प्राचीन बेबीलोन में जन्मी काल्डियन अंकज्योतिष प्रत्येक अक्षर को 1-8 का कंपन देती है (9 आरक्षित है)। नामों को एक एकल अंक और एक यौगिक अंक (10-52) तक घटाया जाता है, जिनमें से प्रत्येक का अपना पारंपरिक अर्थ होता है।',
      mr: 'प्राचीन बॅबिलोनमध्ये उगम पावलेले काल्डियन अंकशास्त्र प्रत्येक अक्षराला 1-8 चे कंपन देते (9 राखीव आहे). नावे एका एकल अंकात आणि एका संयुक्त अंकात (10-52) घटवली जातात, प्रत्येकाचा स्वतःचा पारंपरिक अर्थ असतो.',
    },
  },
  {
    id: 'kabbalah-basics',
    topic: 'kabbalah',
    keywords: ['kabbalah', 'tree of life', 'sephira', 'sephirot', 'hebrew'],
    title: { en: 'Kabbalah Numerology', hi: 'कब्बाला अंकज्योतिष', mr: 'कब्बाला अंकशास्त्र' },
    body: {
      en: 'Kabbalah numerology maps your name to the 22 letters of the Hebrew alphabet and the Tree of Life, connecting your number to a Sephira (sphere of energy) with a specific meaning.',
      hi: 'कब्बाला अंकज्योतिष आपके नाम को हिब्रू वर्णमाला के 22 अक्षरों और जीवन वृक्ष से जोड़ती है, आपके अंक को एक विशिष्ट अर्थ वाले सेफिरा (ऊर्जा क्षेत्र) से जोड़ती है।',
      mr: 'कब्बाला अंकशास्त्र तुमचे नाव हिब्रू वर्णमालेच्या 22 अक्षरांशी आणि जीवनवृक्षाशी जोडते, तुमचा अंक एका विशिष्ट अर्थाच्या सेफिरा (ऊर्जा क्षेत्र) शी जोडते.',
    },
  },
  {
    id: 'loshu-basics',
    topic: 'loshu',
    keywords: ['lo shu', 'loshu', 'magic square', 'missing numbers', 'remedies', 'grid', 'planes'],
    title: { en: 'Lo Shu Grid', hi: 'लो शू ग्रिड', mr: 'लो शू ग्रिड' },
    body: {
      en: 'The Lo Shu is a 3x3 magic square where every row, column, and diagonal sums to 15. Your birth-date digits are placed onto it; empty cells (missing numbers) suggest areas to develop, with remedies offered for balance.',
      hi: 'लो शू एक 3x3 जादुई वर्ग है जिसमें हर पंक्ति, स्तंभ और विकर्ण का योग 15 होता है। आपके जन्मतिथि के अंक इस पर रखे जाते हैं; खाली कोशिकाएँ (अनुपस्थित अंक) विकसित करने के क्षेत्र सुझाती हैं, और संतुलन के उपाय दिए जाते हैं।',
      mr: 'लो शू हा 3x3 जादूचा चौकोन आहे ज्यात प्रत्येक ओळ, स्तंभ आणि कर्ण यांची बेरीज 15 येते. तुमच्या जन्मतारखेचे अंक त्यावर ठेवले जातात; रिकाम्या खोक्या (अनुपस्थित अंक) विकसित करण्याची क्षेत्रे दाखवतात, आणि संतुलनासाठी उपाय दिले जातात.',
    },
  },
  {
    id: 'reiki-basics',
    topic: 'reiki',
    keywords: ['reiki', 'energy healing', 'chakra', 'healing', 'universal energy', 'symbols'],
    title: { en: 'Reiki and Numerology', hi: 'रेकी और अंकज्योतिष', mr: 'रेकी आणि अंकशास्त्र' },
    body: {
      en: 'Reiki is a gentle Japanese energy-healing practice that channels universal life energy through symbols and hand positions. In this app, each number is linked to a Reiki symbol and chakra as a reflective, self-care focus — not a medical treatment.',
      hi: 'रेकी एक कोमल जापानी ऊर्जा-उपचार पद्धति है जो प्रतीकों और हाथों की स्थिति से सार्वभौमिक जीवन ऊर्जा का संचार करती है। इस ऐप में प्रत्येक अंक को एक रेकी प्रतीक और चक्र से जोड़ा गया है — यह चिंतन व स्व-देखभाल के लिए है, चिकित्सा उपचार नहीं।',
      mr: 'रेकी ही एक सौम्य जपानी ऊर्जा-उपचार पद्धती आहे जी प्रतीके आणि हातांच्या स्थितीतून सार्वत्रिक जीवन ऊर्जा वाहते. या ॲपमध्ये प्रत्येक अंक एका रेकी प्रतीकाशी आणि चक्राशी जोडला आहे — हे चिंतन व स्व-काळजीसाठी आहे, वैद्यकीय उपचार नाही.',
    },
  },
  {
    id: 'reiki-chakras',
    topic: 'reiki',
    keywords: ['chakra', 'chakras', 'root', 'sacral', 'solar plexus', 'heart', 'throat', 'third eye', 'crown', 'energy center'],
    title: { en: 'Chakras', hi: 'चक्र', mr: 'चक्रे' },
    body: {
      en: 'Chakras are the body\u2019s seven major energy centers: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, and Crown. Each chakra governs a life theme, and each number resonates with one or more of them.',
      hi: 'चक्र शरीर के सात प्रमुख ऊर्जा केंद्र हैं: मूलाधार, स्वाधिष्ठान, मणिपूर, अनाहत, विशुद्धि, आज्ञा और सहस्रार। प्रत्येक चक्र एक जीवन विषय को नियंत्रित करता है, और प्रत्येक अंक एक या अधिक चक्रों से गूंजता है।',
      mr: 'चक्रे म्हणजे शरीरातील सात प्रमुख ऊर्जा केंद्रे: मूलाधार, स्वाधिष्ठान, मणिपूर, अनाहत, विशुद्धी, आज्ञा आणि सहस्रार. प्रत्येक चक्र एका जीवन विषयावर राज्य करते, आणि प्रत्येक अंक एका किंवा अधिक चक्रांशी गुंजतो.',
    },
  },
  {
    id: 'panchatatva-basics',
    topic: 'panchatatva',
    keywords: ['panchatatva', 'pancha tattva', 'five elements', 'earth', 'water', 'fire', 'air', 'ether', 'akash', 'tattva', 'element'],
    title: { en: 'Panchatatva (Five Elements)', hi: 'पंचतत्त्व (पाँच तत्व)', mr: 'पंचतत्त्व (पाच तत्वे)' },
    body: {
      en: 'Panchatatva is the Vedic model of five elements: Earth, Water, Fire, Air, and Ether (Akash). Each number is associated with an element, and balance across all five is seen as a sign of harmony and well-being.',
      hi: 'पंचतत्त्व पाँच तत्वों का वैदिक मॉडल है: पृथ्वी, जल, अग्नि, वायु और आकाश। प्रत्येक अंक एक तत्व से जुड़ा है, और सभी पाँचों में संतुलन सामंजस्य व कल्याण का संकेत माना जाता है।',
      mr: 'पंचतत्त्व म्हणजे पाच तत्वांचे वैदिक मॉडेल: पृथ्वी, जल, अग्नी, वायू आणि आकाश. प्रत्येक अंक एका तत्वाशी जोडलेला आहे, आणि सर्व पाचांमधील संतुलन हे सुसंवाद व कल्याणाचे लक्षण मानले जाते.',
    },
  },
  {
    id: 'panchatatva-balance',
    topic: 'panchatatva',
    keywords: ['balance', 'element balance', 'grounding', 'remedy', 'imbalance', 'missing element'],
    title: { en: 'Balancing the elements', hi: 'तत्वों का संतुलन', mr: 'तत्वांचे संतुलन' },
    body: {
      en: 'If an element is absent from your core numbers, the app suggests gentle lifestyle practices: earthing for Earth, water rituals for Water, morning sunlight for Fire, breathing for Air, and silence for Ether. These are reflective self-care, not medical advice.',
      hi: 'यदि आपके मुख्य अंकों में कोई तत्व अनुपस्थित है, तो ऐप कोमल जीवनशैली अभ्यास सुझाता है: पृथ्वी के लिए ग्राउंडिंग, जल के लिए जल अनुष्ठान, अग्नि के लिए प्रातः सूर्य, वायु के लिए श्वास, और आकाश के लिए मौन। ये चिंतन स्व-देखभाल हैं, चिकित्सा सलाह नहीं।',
      mr: 'तुमच्या मुख्य अंकांत एखादे तत्व नसेल, तर ॲप सौम्य जीवनशैली सराव सुचवते: पृथ्वीसाठी ग्राउंडिंग, जलासाठी जल विधी, अग्नीसाठी सकाळचा सूर्यप्रकाश, वायूसाठी श्वास, आणि आकाशासाठी मौन. ही चिंतन स्व-काळजी आहे, वैद्यकीय सल्ला नाही.',
    },
  },
  {
    id: 'aura-basics',
    topic: 'aura',
    keywords: ['aura', 'aura cleaning', 'energy field', 'cleanse', 'color'],
    title: { en: 'Aura and Aura Cleaning', hi: 'आभा और आभा शुद्धि', mr: 'आभा आणि आभा शुद्धी' },
    body: {
      en: 'The aura is described as the energy field around the body. Aura cleaning is a reflective practice — using light, breath, sound, or salt baths — to feel refreshed and clear. Each number is linked to an aura colour as a visualization focus.',
      hi: 'आभा शरीर के चारों ओर के ऊर्जा क्षेत्र का वर्णन है। आभा शुद्धि एक चिंतन अभ्यास है — प्रकाश, श्वास, ध्वनि या नमक स्नान से — जिससे ताजगी और स्पष्टता का अनुभव हो। प्रत्येक अंक एक आभा रंग से दृश्य केंद्र के रूप में जुड़ा है।',
      mr: 'आभा म्हणजे शरीराभोवतीचे ऊर्जा क्षेत्र. आभा शुद्धी हा एक चिंतन सराव आहे — प्रकाश, श्वास, ध्वनी किंवा मीठ स्नानाने — ताजेतवाने आणि स्पष्ट वाटण्यासाठी. प्रत्येक अंक एका आभा रंगाशी दृश्य केंद्र म्हणून जोडलेला आहे.',
    },
  },
  {
    id: 'synastry-basics',
    topic: 'synastry',
    keywords: ['synastry', 'compatibility', 'match', 'relationship', 'four elements', 'love'],
    title: { en: 'Compatibility (Synastry)', hi: 'अनुकूलता (सिनैस्ट्री)', mr: 'अनुकूलता (सिनॅस्ट्री)' },
    body: {
      en: 'Synastry compares two charts\u2019 numbers and scores compatibility across the four classical elements: fire (passion), earth (stability), air (communication), and water (emotion). Use it for reflection, never as a final judgment on a relationship.',
      hi: 'सिनैस्ट्री दो चार्टों के अंकों की तुलना कर चार शास्त्रीय तत्वों में अनुकूलता का स्कोर करती है: अग्नि (जुनून), पृथ्वी (स्थिरता), वायु (संवाद) और जल (भावना)। इसका उपयोग चिंतन के लिए करें, किसी संबंध पर अंतिम निर्णय के रूप में कभी नहीं।',
      mr: 'सिनॅस्ट्री दोन चार्टच्या अंकांची तुलना करून चार शास्त्रीय तत्वांमध्ये अनुकूलतेचे गुण देते: अग्नी (उत्कटता), पृथ्वी (स्थिरता), वायू (संवाद) आणि जल (भावना). चिंतनासाठी वापरा, नात्यावर अंतिम निर्णय म्हणून कधीही नाही.',
    },
  },
  {
    id: 'astrology-note',
    topic: 'wellness',
    keywords: ['astrology', 'astronomy', 'science', 'difference', 'stars', 'planets'],
    title: { en: 'Astrology vs Astronomy', hi: 'ज्योतिष बनाम खगोल विज्ञान', mr: 'ज्योतिष वि. खगोलशास्त्र' },
    body: {
      en: 'Astronomy is the scientific study of celestial objects; astrology interprets symbolic links between the planets and human life. Numerology borrows the astrological planet associations symbolically. This app is for reflection and insight, not scientific claims.',
      hi: 'खगोल विज्ञान आकाशीय पिंडों का वैज्ञानिक अध्ययन है; ज्योतिष ग्रहों और मानव जीवन के बीच प्रतीकात्मक संबंधों की व्याख्या करता है। अंकज्योतिष ज्योतिषीय ग्रह संबंधों को प्रतीकात्मक रूप से लेता है। यह ऐप चिंतन व अंतर्दृष्टि के लिए है, वैज्ञानिक दावों के लिए नहीं।',
      mr: 'खगोलशास्त्र म्हणजे आकाशीय पिंडांचा वैज्ञानिक अभ्यास; ज्योतिष ग्रह आणि मानवी जीवन यांतील प्रतीकात्मक संबंधांचा अर्थ लावते. अंकशास्त्र ज्योतिषीय ग्रह संबंध प्रतीकात्मकपणे घेते. हे ॲप चिंतन व अंतर्दृष्टीसाठी आहे, वैज्ञानिक दाव्यांसाठी नाही.',
    },
  },
  {
    id: 'wellness-disclaimer',
    topic: 'wellness',
    keywords: ['medical', 'disclaimer', 'advice', 'health', 'doctor', 'safe'],
    title: { en: 'Is this medical advice?', hi: 'क्या यह चिकित्सा सलाह है?', mr: 'ही वैद्यकीय सल्ला आहे का?' },
    body: {
      en: 'No. All numerology, Reiki, Panchatatva, and aura content here is for self-reflection and entertainment. It is not medical, psychological, legal, or financial advice. Please consult a qualified professional for health or major life decisions.',
      hi: 'नहीं। यहाँ सभी अंकज्योतिष, रेकी, पंचतत्त्व और आभा सामग्री आत्म-चिंतन और मनोरंजन के लिए है। यह चिकित्सा, मनोवैज्ञानिक, कानूनी या वित्तीय सलाह नहीं है। स्वास्थ्य या बड़े जीवन निर्णयों के लिए कृपया योग्य विशेषज्ञ से परामर्श करें।',
      mr: 'नाही. येथील सर्व अंकशास्त्र, रेकी, पंचतत्त्व आणि आभा माहिती आत्मचिंतन आणि मनोरंजनासाठी आहे. ही वैद्यकीय, मानसिक, कायदेशीर किंवा आर्थिक सल्ला नाही. आरोग्य किंवा मोठ्या जीवन निर्णयांसाठी कृपया पात्र तज्ज्ञांचा सल्ला घ्या.',
    },
  },
];

// ---------------------------------------------------------------------------
// Retrieval — pure, dependency-free token scoring.
// ---------------------------------------------------------------------------

export interface RetrievalResult {
  entry: KnowledgeEntry;
  score: number;
}

/** Split text into normalized tokens (letters, marks, and numbers only, lowercased). */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{M}\p{N}]+/u)
    .filter((t) => t.length > 0);
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'what', 'why', 'how', 'about', 'tell', 'me', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'my', 'i',
  'क्या', 'है', 'हैं', 'के', 'की', 'का', 'में', 'बारे', 'बताओ', 'बताइए', 'और', 'मेरा', 'मेरी', 'मुझे',
  'काय', 'आहे', 'आहेत', 'चे', 'ची', 'चा', 'मध्ये', 'बद्दल', 'सांगा', 'आणि', 'माझा', 'माझी', 'मला',
]);

/** Which tokens in the language-localized text should be weighted most. */
function entryTokenWeight(token: string, entry: KnowledgeEntry, language: Language): number {
  const kw = new Set(entry.keywords.flatMap((k) => tokenize(k)));
  const title = new Set(tokenize(entry.title[language]));
  const body = new Set(tokenize(entry.body[language]));
  if (kw.has(token)) return 3;
  if (title.has(token)) return 2;
  if (body.has(token)) return 1;
  return 0;
}

/** Score and rank knowledge entries against a query for a given language. */
export function retrieve(query: string, language: Language, limit = 3): RetrievalResult[] {
  const queryTokens = tokenize(query).filter((t) => !STOP_WORDS.has(t));
  if (queryTokens.length === 0) return [];

  const scored = KNOWLEDGE_BASE.map((entry) => {
    let score = 0;
    for (const token of queryTokens) {
      score += entryTokenWeight(token, entry, language);
    }
    return { entry, score };
  }).filter((r) => r.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export interface LocalAnswer {
  text: string;
  sources: string[];
}

/** Compose a grounded, localized answer from the top retrieval matches. */
export function composeLocalAnswer(query: string, language: Language, limit = 3): LocalAnswer {
  const results = retrieve(query, language, limit);
  if (results.length === 0) {
    return {
      text: fallbackText(language),
      sources: [],
    };
  }
  const parts = results.map((r) => `### ${r.entry.title[language]}\n${r.entry.body[language]}`);
  const disclaimer = `\n\n---\n${WELLNESS_DISCLAIMER[language]}`;
  return {
    text: `${parts.join('\n\n')}${disclaimer}`,
    sources: results.map((r) => r.entry.id),
  };
}

function fallbackText(language: Language): string {
  const base: LocalizedText = {
    en: "I could not find a direct match. Try asking about a tab (Overview, Matrix Wheel, Lo Shu Grid, Personal Hour Clock, Name Optimizer, Energy, Synastry, Oracle), a numerology concept (Life Path, Expression, Soul Urge, Master Numbers), Vedic planets, Reiki, Panchatatva, or aura.",
    hi: 'मुझे सीधा मेल नहीं मिला। किसी टैब (अवलोकन, मैट्रिक्स व्हील, लो शू ग्रिड, व्यक्तिगत घंटा घड़ी, नाम अनुकूलक, ऊर्जा, सिनैस्ट्री, ओरेकल), अंकज्योतिष अवधारणा (जीवन पथ, अभिव्यक्ति, आत्मा की चाह, मास्टर अंक), वैदिक ग्रह, रेकी, पंचतत्त्व या आभा के बारे में पूछने का प्रयास करें।',
    mr: 'मला थेट जुळणारे काही सापडले नाही. एखाद्या टॅबबद्दल (आढावा, मॅट्रिक्स व्हील, लो शू ग्रिड, वैयक्तिक तास घड्याळ, नाव ऑप्टिमायझर, ऊर्जा, सिनॅस्ट्री, ओरॅकल), अंकशास्त्र संकल्पनेबद्दल (जीवनमार्ग, अभिव्यक्ती, आत्म्याची इच्छा, मास्टर अंक), वैदिक ग्रह, रेकी, पंचतत्त्व किंवा आभा याबद्दल विचारून पहा.',
  };
  return `${base[language]}\n\n---\n${WELLNESS_DISCLAIMER[language]}`;
}
