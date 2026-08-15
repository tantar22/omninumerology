/**
 * OmniNumerology shared knowledge base.
 *
 * A single, client-safe source of truth for the meaning of every number and
 * every numerological aspect. Used by the UI for detailed breakdowns and by the
 * server oracle for grounded, zero-hallucination readings.
 */

export interface NumberProfile {
  title: string;
  keywords: string[];
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
}

export interface SimpleMeaning {
  title: string;
  description: string;
}

export interface VedicProfile {
  planet: string;
  title: string;
  description: string;
}

export interface ElementInfo {
  title: string;
  description: string;
  numbers: number[];
}

/** Look up a profile by number, falling back to the reduced single digit. */
export function lookup(map: Record<number, NumberProfile>, n: number): NumberProfile {
  return map[n] ?? map[((n - 1) % 9) + 1] ?? {
    title: 'Unknown',
    keywords: [],
    description: 'No interpretation available.',
    strengths: [],
    challenges: [],
    careers: [],
  };
}

/** Look up a simple meaning by number, falling back to the reduced digit. */
export function lookupSimple(map: Record<number, SimpleMeaning>, n: number): SimpleMeaning {
  return map[n] ?? map[((n - 1) % 9) + 1] ?? { title: 'Unknown', description: 'No interpretation available.' };
}

// ---------------------------------------------------------------------------
// Life Path Number — the core theme of your life's journey.
// ---------------------------------------------------------------------------
export const LIFE_PATH: Record<number, NumberProfile> = {
  1: {
    title: 'The Leader',
    keywords: ['independent', 'pioneering', 'ambitious'],
    description:
      'A life path of independence and originality. You are here to carve your own path, take initiative, and lead rather than follow.',
    strengths: ['Courage', 'Initiative', 'Self-reliance'],
    challenges: ['Stubbornness', 'Dominance', 'Impatience'],
    careers: ['Entrepreneur', 'Executive', 'Freelancer', 'Inventor'],
  },
  2: {
    title: 'The Diplomat',
    keywords: ['cooperative', 'intuitive', 'harmonious'],
    description:
      'A life path of partnership and peacemaking. You thrive through cooperation, emotional intelligence, and gentle persuasion.',
    strengths: ['Diplomacy', 'Empathy', 'Patience'],
    challenges: ['Indecision', 'Over-sensitivity', 'Passivity'],
    careers: ['Counselor', 'Mediator', 'Diplomat', 'Human resources'],
  },
  3: {
    title: 'The Communicator',
    keywords: ['expressive', 'creative', 'social'],
    description:
      'A life path of self-expression and joy. Words, art, and social connection are your natural vehicles for influence.',
    strengths: ['Creativity', 'Optimism', 'Charm'],
    challenges: ['Scattered energy', 'Superficiality', 'Self-criticism'],
    careers: ['Writer', 'Performer', 'Marketer', 'Teacher'],
  },
  4: {
    title: 'The Builder',
    keywords: ['practical', 'disciplined', 'loyal'],
    description:
      'A life path of order and foundation. You are here to build lasting structures through patience, hard work, and reliability.',
    strengths: ['Reliability', 'Organization', 'Determination'],
    challenges: ['Rigidity', 'Stubbornness', 'Workaholism'],
    careers: ['Engineer', 'Accountant', 'Project manager', 'Administrator'],
  },
  5: {
    title: 'The Freedom Seeker',
    keywords: ['adaptable', 'adventurous', 'versatile'],
    description:
      'A life path of change and experience. Freedom, variety, and exploration keep you alive and fuel your resourcefulness.',
    strengths: ['Adaptability', 'Curiosity', 'Energy'],
    challenges: ['Restlessness', 'Impulsiveness', 'Fear of commitment'],
    careers: ['Sales', 'Travel', 'Media', 'Entrepreneur'],
  },
  6: {
    title: 'The Caregiver',
    keywords: ['nurturing', 'responsible', 'harmonious'],
    description:
      'A life path of love, family, and service. You are here to create harmony, beauty, and support for those around you.',
    strengths: ['Compassion', 'Responsibility', 'Artistry'],
    challenges: ['Over-giving', 'Martyrdom', 'Control'],
    careers: ['Teacher', 'Healthcare', 'Design', 'Counseling'],
  },
  7: {
    title: 'The Seeker',
    keywords: ['analytical', 'spiritual', 'introspective'],
    description:
      'A life path of wisdom and inner truth. You are drawn to study, solitude, and the deeper questions of existence.',
    strengths: ['Insight', 'Intuition', 'Depth'],
    challenges: ['Isolation', 'Skepticism', 'Overthinking'],
    careers: ['Researcher', 'Analyst', 'Spiritual advisor', 'Scientist'],
  },
  8: {
    title: 'The Powerhouse',
    keywords: ['ambitious', 'strategic', 'authoritative'],
    description:
      'A life path of power and material mastery. You are here to learn the right use of authority, money, and influence.',
    strengths: ['Leadership', 'Business acumen', 'Resilience'],
    challenges: ['Materialism', 'Control', 'Workaholism'],
    careers: ['Executive', 'Finance', 'Law', 'Real estate'],
  },
  9: {
    title: 'The Humanitarian',
    keywords: ['compassionate', 'idealistic', 'generous'],
    description:
      'A life path of universal love and completion. You are here to give, forgive, and leave the world more compassionate than you found it.',
    strengths: ['Empathy', 'Wisdom', 'Global vision'],
    challenges: ['Martyrdom', 'Resentment', 'Difficulty finishing'],
    careers: ['Nonprofit', 'Arts', 'Healing', 'Advocacy'],
  },
  11: {
    title: 'The Illumined Master',
    keywords: ['intuitive', 'visionary', 'inspiring'],
    description:
      'A master number of spiritual illumination. You carry heightened intuition and are here to inspire and elevate many.',
    strengths: ['Intuition', 'Inspiration', 'Charisma'],
    challenges: ['Nervous tension', 'Anxiety', 'Impracticality'],
    careers: ['Spiritual leader', 'Artist', 'Inventor', 'Visionary founder'],
  },
  22: {
    title: 'The Master Builder',
    keywords: ['visionary', 'pragmatic', 'large-scale'],
    description:
      'The most powerful number for manifestation. You combine grand vision with practical skill to build things that benefit humanity.',
    strengths: ['Vision', 'Practicality', 'Discipline'],
    challenges: ['Overwhelm', 'Pressure', 'Rigidity'],
    careers: ['Architect', 'Diplomat', 'Large-scale builder', 'Strategist'],
  },
  33: {
    title: 'The Master Teacher',
    keywords: ['compassionate', 'healing', 'selfless'],
    description:
      'The master number of service. Your path is to teach, heal, and uplift through unconditional love and wisdom.',
    strengths: ['Compassion', 'Teaching', 'Healing'],
    challenges: ['Self-sacrifice', 'Burnout', 'Perfectionism'],
    careers: ['Teacher', 'Healer', 'Philanthropist', 'Mentor'],
  },
};

// ---------------------------------------------------------------------------
// Expression (Destiny) Number — your natural talents and abilities.
// ---------------------------------------------------------------------------
export const EXPRESSION: Record<number, NumberProfile> = {
  1: { title: 'The Initiator', keywords: ['leadership', 'originality'], description: 'You express your talents through initiative, originality, and decisive action.', strengths: ['Leadership', 'Independence'], challenges: ['Impatience', 'Dominance'], careers: ['Founder', 'Leader'] },
  2: { title: 'The Collaborator', keywords: ['diplomacy', 'cooperation'], description: 'Your talents shine in partnership, mediation, and supportive roles.', strengths: ['Diplomacy', 'Empathy'], challenges: ['Indecision', 'Over-sensitivity'], careers: ['Mediator', 'Advisor'] },
  3: { title: 'The Creator', keywords: ['creativity', 'eloquence'], description: 'You express through words, art, and social charm.', strengths: ['Creativity', 'Communication'], challenges: ['Scattered focus', 'Self-doubt'], careers: ['Writer', 'Performer'] },
  4: { title: 'The Organizer', keywords: ['precision', 'reliability'], description: 'You express through structure, precision, and dependable execution.', strengths: ['Discipline', 'Method'], challenges: ['Rigidity', 'Perfectionism'], careers: ['Engineer', 'Administrator'] },
  5: { title: 'The Communicator', keywords: ['versatility', 'persuasion'], description: 'You express through versatility, movement, and persuasive communication.', strengths: ['Adaptability', 'Eloquence'], challenges: ['Restlessness', 'Impulsiveness'], careers: ['Sales', 'Media'] },
  6: { title: 'The Caretaker', keywords: ['nurturing', 'responsibility'], description: 'You express through care, responsibility, and aesthetic harmony.', strengths: ['Compassion', 'Dedication'], challenges: ['Over-giving', 'Control'], careers: ['Teacher', 'Designer'] },
  7: { title: 'The Analyst', keywords: ['insight', 'specialization'], description: 'You express through analysis, research, and deep specialization.', strengths: ['Insight', 'Precision'], challenges: ['Isolation', 'Skepticism'], careers: ['Researcher', 'Analyst'] },
  8: { title: 'The Executive', keywords: ['authority', 'management'], description: 'You express through authority, management, and material achievement.', strengths: ['Leadership', 'Strategy'], challenges: ['Materialism', 'Control'], careers: ['Executive', 'Financier'] },
  9: { title: 'The Visionary', keywords: ['compassion', 'universality'], description: 'You express through compassion, broad vision, and humanitarian ideals.', strengths: ['Empathy', 'Wisdom'], challenges: ['Martyrdom', 'Resentment'], careers: ['Philanthropist', 'Artist'] },
  11: { title: 'The Inspired', keywords: ['intuition', 'inspiration'], description: 'You express through inspired vision and intuitive insight.', strengths: ['Intuition', 'Charisma'], challenges: ['Nervous tension', 'Impracticality'], careers: ['Visionary', 'Spiritual teacher'] },
  22: { title: 'The Master Organizer', keywords: ['vision', 'execution'], description: 'You express through large-scale vision backed by flawless execution.', strengths: ['Vision', 'Discipline'], challenges: ['Overwhelm', 'Rigidity'], careers: ['Architect', 'Strategist'] },
  33: { title: 'The Selfless Teacher', keywords: ['healing', 'service'], description: 'You express through selfless teaching, healing, and service.', strengths: ['Compassion', 'Wisdom'], challenges: ['Burnout', 'Perfectionism'], careers: ['Teacher', 'Healer'] },
};

// ---------------------------------------------------------------------------
// Soul Urge (Heart's Desire) Number — your inner motivation.
// ---------------------------------------------------------------------------
export const SOUL_URGE: Record<number, NumberProfile> = {
  1: { title: 'Desire for Independence', keywords: ['autonomy', 'self-direction'], description: 'Deep down you crave independence and the freedom to direct your own life.', strengths: ['Courage', 'Self-reliance'], challenges: ['Stubbornness', 'Isolation'], careers: ['Solo ventures', 'Leadership'] },
  2: { title: 'Desire for Harmony', keywords: ['love', 'belonging'], description: 'You long for love, harmony, and a deep sense of belonging with others.', strengths: ['Empathy', 'Devotion'], challenges: ['Clinginess', 'Indecision'], careers: ['Partnership', 'Counseling'] },
  3: { title: 'Desire for Expression', keywords: ['joy', 'creativity'], description: 'You crave self-expression, joy, and the freedom to create and communicate.', strengths: ['Creativity', 'Optimism'], challenges: ['Scattered energy', 'Self-criticism'], careers: ['Arts', 'Communication'] },
  4: { title: 'Desire for Security', keywords: ['stability', 'order'], description: 'You seek stability, order, and a secure foundation to build upon.', strengths: ['Discipline', 'Loyalty'], challenges: ['Rigidity', 'Fear of change'], careers: ['Operations', 'Finance'] },
  5: { title: 'Desire for Freedom', keywords: ['adventure', 'experience'], description: 'You yearn for freedom, adventure, and a life rich with new experience.', strengths: ['Adaptability', 'Enthusiasm'], challenges: ['Restlessness', 'Commitment fear'], careers: ['Travel', 'Exploration'] },
  6: { title: 'Desire to Nurture', keywords: ['home', 'service'], description: 'You desire to nurture, beautify, and serve your loved ones and community.', strengths: ['Compassion', 'Dedication'], challenges: ['Over-giving', 'Control'], careers: ['Caregiving', 'Design'] },
  7: { title: 'Desire for Truth', keywords: ['solitude', 'wisdom'], description: 'You seek truth, solitude, and deep spiritual or intellectual understanding.', strengths: ['Insight', 'Depth'], challenges: ['Isolation', 'Skepticism'], careers: ['Research', 'Spirituality'] },
  8: { title: 'Desire for Achievement', keywords: ['authority', 'security'], description: 'You desire achievement, authority, and material security through mastery.', strengths: ['Ambition', 'Resilience'], challenges: ['Materialism', 'Workaholism'], careers: ['Business', 'Leadership'] },
  9: { title: 'Desire to Contribute', keywords: ['completion', 'giving'], description: 'You desire to contribute, complete, and elevate others through compassion.', strengths: ['Generosity', 'Wisdom'], challenges: ['Martyrdom', 'Resentment'], careers: ['Humanitarian', 'Healing'] },
  11: { title: 'Desire to Inspire', keywords: ['intuition', 'uplift'], description: 'You desire to inspire and uplift others through intuitive vision.', strengths: ['Intuition', 'Idealism'], challenges: ['Nervous tension', 'Impracticality'], careers: ['Inspirational', 'Spiritual'] },
  22: { title: 'Desire to Build', keywords: ['legacy', 'manifestation'], description: 'You desire to build something lasting and meaningful for the world.', strengths: ['Vision', 'Discipline'], challenges: ['Overwhelm', 'Pressure'], careers: ['Architecture', 'Leadership'] },
  33: { title: 'Desire to Heal', keywords: ['teaching', 'service'], description: 'You desire to heal, teach, and serve humanity on a universal scale.', strengths: ['Compassion', 'Devotion'], challenges: ['Burnout', 'Self-sacrifice'], careers: ['Teaching', 'Healing'] },
};

// ---------------------------------------------------------------------------
// Personality Number — how others perceive you.
// ---------------------------------------------------------------------------
export const PERSONALITY: Record<number, SimpleMeaning> = {
  1: { title: 'The Confident First Impression', description: 'Others see you as confident, direct, and capable of taking charge.' },
  2: { title: 'The Gentle Presence', description: 'Others see you as warm, cooperative, and easy to approach.' },
  3: { title: 'The Charming Socialite', description: 'Others see you as charming, expressive, and fun to be around.' },
  4: { title: 'The Dependable Rock', description: 'Others see you as reserved, reliable, and thoroughly practical.' },
  5: { title: 'The Dynamic Adventurer', description: 'Others see you as energetic, adaptable, and always on the move.' },
  6: { title: 'The Warm Caretaker', description: 'Others see you as warm, responsible, and protective.' },
  7: { title: 'The Mysterious Thinker', description: 'Others see you as thoughtful, reserved, and quietly perceptive.' },
  8: { title: 'The Strong Achiever', description: 'Others see you as strong, successful, and in command.' },
  9: { title: 'The Magnetic Humanitarian', description: 'Others see you as compassionate, magnetic, and broad-minded.' },
  11: { title: 'The Magnetic Visionary', description: 'Others sense an intuitive, magnetic, and inspired quality in you.' },
  22: { title: 'The Capable Authority', description: 'Others see you as capable, authoritative, and exceptionally competent.' },
  33: { title: 'The Nurturing Wise One', description: 'Others see you as nurturing, wise, and deeply caring.' },
};

// ---------------------------------------------------------------------------
// Birthday Number — a specific sub-talent.
// ---------------------------------------------------------------------------
export const BIRTHDAY: Record<number, SimpleMeaning> = {
  1: { title: 'Leadership Flair', description: 'A natural gift for taking initiative and leading the way.' },
  2: { title: 'Diplomatic Flair', description: 'A natural gift for harmony, cooperation, and mediation.' },
  3: { title: 'Creative Flair', description: 'A natural gift for creativity, words, and joyful expression.' },
  4: { title: 'Practical Flair', description: 'A natural gift for structure, method, and reliability.' },
  5: { title: 'Versatile Flair', description: 'A natural gift for adaptability, communication, and change.' },
  6: { title: 'Nurturing Flair', description: 'A natural gift for care, beauty, and responsibility.' },
  7: { title: 'Analytical Flair', description: 'A natural gift for analysis, insight, and specialization.' },
  8: { title: 'Executive Flair', description: 'A natural gift for management, authority, and achievement.' },
  9: { title: 'Humanitarian Flair', description: 'A natural gift for compassion, generosity, and vision.' },
  11: { title: 'Intuitive Flair', description: 'A heightened gift of intuition and inspiration.' },
  22: { title: 'Visionary Flair', description: 'A rare gift for turning grand visions into reality.' },
  33: { title: 'Healing Flair', description: 'A profound gift for teaching and healing others.' },
};

// ---------------------------------------------------------------------------
// Maturity Number — your integration in later life.
// ---------------------------------------------------------------------------
export const MATURITY: Record<number, SimpleMeaning> = {
  1: { title: 'Self-Directed Wisdom', description: 'Later life asks you to lead with independent, self-directed wisdom.' },
  2: { title: 'Harmonious Wisdom', description: 'Later life asks you to cultivate harmony and deep cooperation.' },
  3: { title: 'Expressive Wisdom', description: 'Later life asks you to share joy and creative expression.' },
  4: { title: 'Structured Wisdom', description: 'Later life asks you to embody order, patience, and solid foundations.' },
  5: { title: 'Liberated Wisdom', description: 'Later life asks you to embrace freedom, change, and exploration.' },
  6: { title: 'Service Wisdom', description: 'Later life asks you to deepen love, service, and responsibility.' },
  7: { title: 'Contemplative Wisdom', description: 'Later life asks you to turn inward toward study and truth.' },
  8: { title: 'Mastery Wisdom', description: 'Later life asks you to master power, authority, and abundance.' },
  9: { title: 'Universal Wisdom', description: 'Later life asks you to give generously and complete your cycles.' },
  11: { title: 'Illuminated Wisdom', description: 'Later life asks you to live as an inspired guide for others.' },
  22: { title: 'Builder Wisdom', description: 'Later life asks you to manifest large-scale, lasting contributions.' },
  33: { title: 'Teacher Wisdom', description: 'Later life asks you to teach and heal through compassion.' },
};

// ---------------------------------------------------------------------------
// Pinnacle Cycles — four distinct phases of life.
// ---------------------------------------------------------------------------
export const PINNACLE: Record<number, SimpleMeaning> = {
  1: { title: 'Pinnacle of Achievement', description: 'A phase of leadership, independence, and personal achievement.' },
  2: { title: 'Pinnacle of Cooperation', description: 'A phase of partnership, patience, and emotional growth.' },
  3: { title: 'Pinnacle of Expression', description: 'A phase of creativity, communication, and social expansion.' },
  4: { title: 'Pinnacle of Foundation', description: 'A phase of hard work, discipline, and building foundations.' },
  5: { title: 'Pinnacle of Freedom', description: 'A phase of change, freedom, and new opportunities.' },
  6: { title: 'Pinnacle of Responsibility', description: 'A phase of family, service, and domestic harmony.' },
  7: { title: 'Pinnacle of Learning', description: 'A phase of study, specialization, and inner growth.' },
  8: { title: 'Pinnacle of Power', description: 'A phase of material success, authority, and management.' },
  9: { title: 'Pinnacle of Giving', description: 'A phase of humanitarian service and completion.' },
  11: { title: 'Pinnacle of Illumination', description: 'A phase of spiritual insight and inspired leadership.' },
  22: { title: 'Pinnacle of Building', description: 'A phase of large-scale practical achievement.' },
};

// ---------------------------------------------------------------------------
// Challenge Numbers — obstacles to overcome.
// ---------------------------------------------------------------------------
export const CHALLENGE: Record<number, SimpleMeaning> = {
  0: { title: 'The Free Choice', description: 'A minimal challenge: you are free to choose your own lessons.' },
  1: { title: 'Challenge of Independence', description: 'Learn to stand on your own and trust your own initiative.' },
  2: { title: 'Challenge of Sensitivity', description: 'Learn to balance sensitivity with healthy boundaries.' },
  3: { title: 'Challenge of Expression', description: 'Learn to trust your voice and express yourself confidently.' },
  4: { title: 'Challenge of Discipline', description: 'Learn to build structure, routine, and reliability.' },
  5: { title: 'Challenge of Flexibility', description: 'Learn to embrace change and release the need for control.' },
  6: { title: 'Challenge of Balance', description: 'Learn to serve others without losing yourself.' },
  7: { title: 'Challenge of Faith', description: 'Learn to trust your intuition and the unseen.' },
  8: { title: 'Challenge of Material Balance', description: 'Learn to handle power and money with integrity.' },
  9: { title: 'Challenge of Compassion', description: 'Learn to give, forgive, and let go of resentment.' },
};

// ---------------------------------------------------------------------------
// Chaldean Single Number — the vibratory essence of your name.
// ---------------------------------------------------------------------------
export const CHALDEAN_SINGLE: Record<number, SimpleMeaning> = {
  1: { title: 'The Independent', description: 'Chaldean 1 vibrates with leadership, courage, and originality.' },
  2: { title: 'The Diplomat', description: 'Chaldean 2 vibrates with tact, intuition, and partnership.' },
  3: { title: 'The Expressive', description: 'Chaldean 3 vibrates with creativity, sociability, and optimism.' },
  4: { title: 'The Practical', description: 'Chaldean 4 vibrates with order, discipline, and reliability.' },
  5: { title: 'The Adaptable', description: 'Chaldean 5 vibrates with freedom, change, and versatility.' },
  6: { title: 'The Harmonizer', description: 'Chaldean 6 vibrates with love, beauty, and responsibility.' },
  7: { title: 'The Mystic', description: 'Chaldean 7 vibrates with introspection, wisdom, and spirituality.' },
  8: { title: 'The Executive', description: 'Chaldean 8 vibrates with authority, ambition, and material power.' },
  9: { title: 'The Humanitarian', description: 'Chaldean 9 vibrates with compassion, completion, and universal love.' },
};

// ---------------------------------------------------------------------------
// Vedic numbers (Moolank / Bhagyank) and their ruling planets.
// ---------------------------------------------------------------------------
export const VEDIC_NUMBER: Record<number, VedicProfile> = {
  1: { planet: 'Sun', title: 'The Sovereign', description: 'Ruled by the Sun, this number brings authority, vitality, and leadership.' },
  2: { planet: 'Moon', title: 'The Nurturer', description: 'Ruled by the Moon, this number brings emotion, intuition, and receptivity.' },
  3: { planet: 'Jupiter', title: 'The Sage', description: 'Ruled by Jupiter, this number brings wisdom, expansion, and good fortune.' },
  4: { planet: 'Rahu', title: 'The Unconventional', description: 'Ruled by Rahu, this number brings material ambition and unconventional drive.' },
  5: { planet: 'Mercury', title: 'The Communicator', description: 'Ruled by Mercury, this number brings intellect, wit, and adaptability.' },
  6: { planet: 'Venus', title: 'The Lover', description: 'Ruled by Venus, this number brings love, beauty, and harmony.' },
  7: { planet: 'Ketu', title: 'The Mystic', description: 'Ruled by Ketu, this number brings spirituality, detachment, and insight.' },
  8: { planet: 'Saturn', title: 'The Karmic', description: 'Ruled by Saturn, this number brings discipline, endurance, and karmic lessons.' },
  9: { planet: 'Mars', title: 'The Warrior', description: 'Ruled by Mars, this number brings courage, energy, and action.' },
};

// ---------------------------------------------------------------------------
// Personal Year / Month / Day cycles.
// ---------------------------------------------------------------------------
export const PERSONAL_CYCLE: Record<number, SimpleMeaning> = {
  1: { title: 'New Beginnings', description: 'A cycle of fresh starts — plant seeds, initiate, and act independently.' },
  2: { title: 'Cooperation', description: 'A cycle of patience and partnership — connect, listen, and build trust.' },
  3: { title: 'Expression', description: 'A cycle of creativity and communication — create, share, and socialize.' },
  4: { title: 'Building', description: 'A cycle of consolidation — organize, plan, and lay solid foundations.' },
  5: { title: 'Change', description: 'A cycle of freedom and movement — travel, adapt, and embrace the new.' },
  6: { title: 'Responsibility', description: 'A cycle of home and service — nurture, beautify, and fulfill duties.' },
  7: { title: 'Reflection', description: 'A cycle of introspection — study, rest, and turn inward.' },
  8: { title: 'Power', description: 'A cycle of achievement — advance, manage resources, and take charge.' },
  9: { title: 'Completion', description: 'A cycle of release — finish, forgive, and prepare for renewal.' },
};

// ---------------------------------------------------------------------------
// Lo Shu planes — the meaning of each arrow.
// ---------------------------------------------------------------------------
export const LO_SHU_PLANE_MEANING: Record<string, SimpleMeaning> = {
  mental: { title: 'Mental Plane', description: 'The 4-9-2 arrow governs intellect, memory, and quick thinking.' },
  emotional: { title: 'Emotional Plane', description: 'The 3-5-7 arrow governs sensitivity, empathy, and emotional depth.' },
  practical: { title: 'Practical Plane', description: 'The 8-1-6 arrow governs practicality, action, and material competence.' },
  thought: { title: 'Thought Plane', description: 'The 4-3-8 arrow governs planning, forethought, and mental organization.' },
  will: { title: 'Will Plane', description: 'The 9-5-1 arrow governs willpower, determination, and self-drive.' },
  action: { title: 'Action Plane', description: 'The 2-7-6 arrow governs the ability to act on ideas and complete tasks.' },
  determination: { title: 'Determination (Diagonal)', description: 'The 4-5-6 diagonal governs perseverance and the drive to finish.' },
  spirituality: { title: 'Spirituality (Diagonal)', description: 'The 2-5-8 diagonal governs inner balance, faith, and spiritual grounding.' },
};

/** The four element groups used in synastry scoring. */
export const ELEMENTS_INFO: Record<'fire' | 'earth' | 'air' | 'water', ElementInfo> = {
  fire: { title: 'Fire', description: 'Passionate, dynamic, and initiating. Fire numbers: 1 and 9.', numbers: [1, 9] },
  earth: { title: 'Earth', description: 'Practical, stable, and grounded. Earth numbers: 4 and 8.', numbers: [4, 8] },
  air: { title: 'Air', description: 'Intellectual, social, and communicative. Air numbers: 3 and 5.', numbers: [3, 5] },
  water: { title: 'Water', description: 'Emotional, intuitive, and nurturing. Water numbers: 2, 6 and 7.', numbers: [2, 6, 7] },
};

// ---------------------------------------------------------------------------
// Panchatatva — the five elements (Earth, Water, Fire, Air, Ether).
// A remedies/balance layer distinct from the four-element synastry model. The
// fifth tattva, Akash (Ether/Space), is assigned to the number 5.
// ---------------------------------------------------------------------------
export type TattvaKey = 'earth' | 'water' | 'fire' | 'air' | 'ether';

export interface TattvaProfile {
  title: string;
  sanskrit: string;
  numbers: number[];
  qualities: string;
  imbalance: string[];
  balance: string[];
}

export const PANCHATATVA: Record<TattvaKey, TattvaProfile> = {
  earth: {
    title: 'Earth',
    sanskrit: 'Prithvi',
    numbers: [4, 8],
    qualities: 'Grounding, stability, patience, and material form.',
    imbalance: ['Restlessness', 'Scattered focus', 'Feeling unrooted', 'Over-attachment to outcomes'],
    balance: ['Walk barefoot on soil or grass (earthing)', 'Eat root vegetables and warm, cooked food', 'Declutter and organize your space', 'Hold grounding stones like hematite or red jasper'],
  },
  water: {
    title: 'Water',
    sanskrit: 'Jala',
    numbers: [2, 6, 7],
    qualities: 'Emotion, intuition, flow, and receptivity.',
    imbalance: ['Emotional numbness', 'Rigidity', 'Holding grudges', 'Overthinking feelings'],
    balance: ['Sit near flowing water or take a cleansing bath', 'Journal your emotions without judgment', 'Practice forgiveness and letting go', 'Drink water mindfully and stay hydrated'],
  },
  fire: {
    title: 'Fire',
    sanskrit: 'Agni',
    numbers: [1, 9],
    qualities: 'Willpower, vitality, courage, and transformation.',
    imbalance: ['Lethargy', 'Lack of motivation', 'Digestive sluggishness', 'Fear of taking action'],
    balance: ['Bask in morning sunlight', 'Practice breath-of-fire (kapalabhati) gently', 'Eat warming spices like ginger and cinnamon', 'Set one bold, time-bound intention'],
  },
  air: {
    title: 'Air',
    sanskrit: 'Vayu',
    numbers: [3],
    qualities: 'Intellect, communication, movement, and connection.',
    imbalance: ['Mental fog', 'Over-analysis', 'Shallow breathing', 'Social withdrawal'],
    balance: ['Practice deep, slow pranayama breathing', 'Walk outdoors in open air', 'Speak or write your truth daily', 'Take up a light, rhythmic movement practice'],
  },
  ether: {
    title: 'Ether',
    sanskrit: 'Akash',
    numbers: [5],
    qualities: 'Space, freedom, intuition, and receptivity to the subtle.',
    imbalance: ['Crowded schedule', 'Noise overwhelm', 'Feeling trapped', 'Lack of quiet reflection'],
    balance: ['Carve out silent, unstructured time each day', 'Practice meditation or listening to silence', 'Cleanse your environment (smudging, decluttering)', 'Spend time under the open sky or starry night'],
  },
};

/** Which tattva each single number 1-9 rules (the 5-element Panchatatva model). */
export const NUMBER_TATTVA: Record<number, TattvaKey> = {
  1: 'fire',
  2: 'water',
  3: 'air',
  4: 'earth',
  5: 'ether',
  6: 'water',
  7: 'water',
  8: 'earth',
  9: 'fire',
};

// ---------------------------------------------------------------------------
// Reiki — per-number chakra, symbol and healing focus.
// ---------------------------------------------------------------------------
export interface ReikiProfile {
  chakra: string;
  symbol: string;
  focus: string;
}

export const REIKI_NUMBER: Record<number, ReikiProfile> = {
  1: { chakra: 'Root (Muladhara)', symbol: 'Cho Ku Rei', focus: 'Grounding, courage, and a secure foundation.' },
  2: { chakra: 'Sacral (Svadhisthana)', symbol: 'Sei He Ki', focus: 'Emotional flow, creativity, and healthy boundaries.' },
  3: { chakra: 'Solar Plexus (Manipura)', symbol: 'Cho Ku Rei', focus: 'Willpower, confidence, and self-worth.' },
  4: { chakra: 'Root (Muladhara)', symbol: 'Cho Ku Rei', focus: 'Stability, structure, and material security.' },
  5: { chakra: 'Throat (Vishuddha)', symbol: 'Sei He Ki', focus: 'Truthful communication and self-expression.' },
  6: { chakra: 'Heart (Anahata)', symbol: 'Sei He Ki', focus: 'Love, compassion, and forgiveness.' },
  7: { chakra: 'Third Eye (Ajna)', symbol: 'Hon Sha Ze Sho Nen', focus: 'Intuition, insight, and inner vision.' },
  8: { chakra: 'Solar Plexus (Manipura)', symbol: 'Cho Ku Rei', focus: 'Personal power, abundance, and leadership.' },
  9: { chakra: 'Crown (Sahasrara)', symbol: 'Dai Ko Myo', focus: 'Completion, wisdom, and universal love.' },
};

// ---------------------------------------------------------------------------
// Aura cleaning — per-number aura colour and cleansing practice.
// ---------------------------------------------------------------------------
export interface AuraProfile {
  color: string;
  hex: string;
  practice: string;
}

export const AURA_CLEANING: Record<number, AuraProfile> = {
  1: { color: 'Radiant Red', hex: '#E57373', practice: 'A sea-salt bath with a red candle, visualising red light sweeping the aura.' },
  2: { color: 'Soft Orange', hex: '#FFB74D', practice: 'A moonlit walk or water ritual, imagining orange light washing away stagnation.' },
  3: { color: 'Sunny Yellow', hex: '#FFD54F', practice: 'Morning sunlight with deep breathing, picturing yellow light energising the field.' },
  4: { color: 'Emerald Green', hex: '#81C784', practice: 'Earthing outdoors, visualising green light sealing and stabilising the aura.' },
  5: { color: 'Sky Blue', hex: '#4FC3F7', practice: 'Sound cleansing with a bell or bowl, imagining blue light clearing the throat field.' },
  6: { color: 'Indigo', hex: '#7986CB', practice: 'Heart-centered meditation, picturing indigo light dissolving emotional residue.' },
  7: { color: 'Violet', hex: '#A78BFA', practice: 'Smudging with sage or palo santo in quiet solitude, bathing the aura in violet light.' },
  8: { color: 'Rose Gold', hex: '#F48FB1', practice: 'Grounding with amber or citrine, visualising rose-gold light restoring abundance.' },
  9: { color: 'White Gold', hex: '#E0C98A', practice: 'A white-light shower visualisation from crown to feet, renewing the whole aura.' },
};

/** A general, number-independent daily aura-cleansing ritual. */
export const DAILY_AURA_RITUAL: string[] = [
  'Begin with three slow breaths, exhaling tension through the mouth.',
  'Sweep both hands over your body from head to toe, flicking away heaviness.',
  'Visualise white light filling your energy field from the crown downward.',
  'Set a single positive intention for the day and hold it for ten breaths.',
];

/** Reduce a (possibly master) number 1-33 to its single digit 1-9. */
export function reduceDigit(n: number): number {
  return ((n - 1) % 9) + 1;
}

/** Tattva for a number, reducing master numbers first. */
export function tattvaFor(n: number): TattvaKey {
  return NUMBER_TATTVA[reduceDigit(n)] ?? 'ether';
}

/** Reiki profile for a number, reducing master numbers first. */
export function reikiFor(n: number): ReikiProfile {
  return REIKI_NUMBER[reduceDigit(n)] ?? REIKI_NUMBER[1];
}

/** Aura profile for a number, reducing master numbers first. */
export function auraFor(n: number): AuraProfile {
  return AURA_CLEANING[reduceDigit(n)] ?? AURA_CLEANING[1];
}

// ---------------------------------------------------------------------------
// Localization bundle — every translatable meaning map in one object.
// ---------------------------------------------------------------------------
export interface MeaningsBundle {
  LIFE_PATH: Record<number, NumberProfile>;
  EXPRESSION: Record<number, NumberProfile>;
  SOUL_URGE: Record<number, NumberProfile>;
  PERSONALITY: Record<number, SimpleMeaning>;
  BIRTHDAY: Record<number, SimpleMeaning>;
  MATURITY: Record<number, SimpleMeaning>;
  PINNACLE: Record<number, SimpleMeaning>;
  CHALLENGE: Record<number, SimpleMeaning>;
  CHALDEAN_SINGLE: Record<number, SimpleMeaning>;
  VEDIC_NUMBER: Record<number, VedicProfile>;
  PERSONAL_CYCLE: Record<number, SimpleMeaning>;
  LO_SHU_PLANE_MEANING: Record<string, SimpleMeaning>;
  ELEMENTS_INFO: Record<'fire' | 'earth' | 'air' | 'water', ElementInfo>;
  PANCHATATVA: Record<TattvaKey, TattvaProfile>;
  REIKI_NUMBER: Record<number, ReikiProfile>;
  AURA_CLEANING: Record<number, AuraProfile>;
  DAILY_AURA_RITUAL: string[];
}

/** The English meanings, used as the source of truth and fallback language. */
export const EN_MEANINGS: MeaningsBundle = {
  LIFE_PATH,
  EXPRESSION,
  SOUL_URGE,
  PERSONALITY,
  BIRTHDAY,
  MATURITY,
  PINNACLE,
  CHALLENGE,
  CHALDEAN_SINGLE,
  VEDIC_NUMBER,
  PERSONAL_CYCLE,
  LO_SHU_PLANE_MEANING,
  ELEMENTS_INFO,
  PANCHATATVA,
  REIKI_NUMBER,
  AURA_CLEANING,
  DAILY_AURA_RITUAL,
};
