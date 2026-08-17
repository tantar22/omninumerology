'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useT } from '@/lib/i18n-client';
import type { UnifiedMatrix } from '@/engine';
import type { jsPDF } from 'jspdf';
import { useMatrixStore } from '@/stores/useMatrixStore';

interface PdfReportButtonProps {
  disabled?: boolean;
}

// ─── Number meanings database ────────────────────────────────────────────────

const LIFE_PATH_MEANINGS: Record<number, { title: string; titleHi: string; archetype: string; description: string; strengths: string[]; challenges: string[]; ideal: string }> = {
  1: { title: 'The Leader', titleHi: 'नेता', archetype: 'Pioneer', description: 'A life path of independence and originality. You are here to carve your own path, take initiative, and lead rather than follow.', strengths: ['Courage', 'Initiative', 'Self-reliance'], challenges: ['Stubbornness', 'Dominance', 'Impatience'], ideal: 'Entrepreneur, Executive, Freelancer, Inventor' },
  2: { title: 'The Peacemaker', titleHi: 'शांतिदूत', archetype: 'Diplomat', description: 'A life path of cooperation and sensitivity. You are here to build bridges, mediate, and create harmony between people.', strengths: ['Empathy', 'Patience', 'Cooperation'], challenges: ['Indecision', 'Over-sensitivity', 'Dependency'], ideal: 'Counsellor, Mediator, Team Player, Diplomat' },
  3: { title: 'The Expressive', titleHi: 'अभिव्यक्ति', archetype: 'Artist', description: 'A life path of creativity and communication. You are here to express, inspire, and bring joy through words, art, or performance.', strengths: ['Creativity', 'Optimism', 'Communication'], challenges: ['Scattered energy', 'Superficiality', 'Mood swings'], ideal: 'Writer, Artist, Entertainer, Teacher' },
  4: { title: 'The Builder', titleHi: 'निर्माता', archetype: 'Architect', description: 'A life path of structure and stability. You are here to build solid foundations, create order, and establish lasting systems.', strengths: ['Discipline', 'Loyalty', 'Practicality'], challenges: ['Rigidity', 'Stubbornness', 'Over-caution'], ideal: 'Engineer, Manager, Builder, Accountant' },
  5: { title: 'The Adventurer', titleHi: 'साहसी', archetype: 'Explorer', description: 'A life path of freedom and change. You are here to experience life fully, adapt, and inspire others through your adventures.', strengths: ['Versatility', 'Curiosity', 'Freedom'], challenges: ['Restlessness', 'Impulsiveness', 'Inconsistency'], ideal: 'Traveller, Salesperson, Marketer, Journalist' },
  6: { title: 'The Nurturer', titleHi: 'पालनहार', archetype: 'Healer', description: 'A life path of responsibility and service. You are here to nurture, beautify, and serve your loved ones and community.', strengths: ['Compassion', 'Dedication', 'Harmony'], challenges: ['Over-giving', 'Control', 'Martyrdom'], ideal: 'Caregiving, Design, Teaching, Nursing' },
  7: { title: 'The Seeker', titleHi: 'साधक', archetype: 'Scholar', description: 'A life path of analysis and wisdom. You are here to seek truth, understand deep principles, and share your knowledge.', strengths: ['Analytical mind', 'Intuition', 'Wisdom'], challenges: ['Isolation', 'Skepticism', 'Overthinking'], ideal: 'Researcher, Analyst, Philosopher, Scientist' },
  8: { title: 'The Powerhouse', titleHi: 'शक्ति', archetype: 'Executive', description: 'A life path of abundance and authority. You are here to achieve material success, lead with integrity, and create prosperity.', strengths: ['Ambition', 'Confidence', 'Business acumen'], challenges: ['Workaholic tendencies', 'Power struggles', 'Materialism'], ideal: 'Business Owner, Executive, Financial Planner' },
  9: { title: 'The Humanitarian', titleHi: 'मानवतावादी', archetype: 'Compassionate Leader', description: 'A life path of compassion and completion. You are here to serve humanity, let go of the past, and embrace universal love.', strengths: ['Generosity', 'Idealism', 'Compassion'], challenges: ['Emotional turbulence', 'Idealism', 'Resentment'], ideal: 'Social Worker, Philanthropist, Artist, Healer' },
  11: { title: 'The Intuitive', titleHi: 'आध्यात्मिक', archetype: 'Visionary', description: 'A Master Number life path of spiritual insight and intuition. You are here to inspire others through your visionary ideas.', strengths: ['Intuition', 'Creativity', 'Spiritual awareness'], challenges: ['Nervousness', 'Impracticality', 'Self-doubt'], ideal: 'Spiritual Teacher, Artist, Healer, Inventor' },
  22: { title: 'The Master Builder', titleHi: 'मास्टर बिल्डर', archetype: 'Visionary Architect', description: 'A Master Number life path of building grand visions into reality. You are here to create lasting impact on a large scale.', strengths: ['Vision', 'Practicality', 'Leadership'], challenges: ['Pressure to succeed', 'Perfectionism', 'Self-doubt'], ideal: 'Architect, World Leader, Entrepreneur, Inventor' },
  33: { title: 'The Master Teacher', titleHi: 'मास्टर गुरु', archetype: 'Spiritual Guide', description: 'A Master Number life path of spiritual teaching and healing. You are here to uplift humanity through compassion and wisdom.', strengths: ['Compassion', 'Healing', 'Wisdom'], challenges: ['Emotional sensitivity', 'Self-sacrifice', 'Burden'], ideal: 'Spiritual Teacher, Healer, Counsellor, Artist' },
};

const EXPRESSION_MEANINGS: Record<number, { title: string; description: string; strengths: string[]; challenges: string[]; ideal: string }> = {
  1: { title: 'The Independent', description: 'You express through leadership, originality, and initiative. You are a natural pioneer who creates through self-reliance.', strengths: ['Leadership', 'Originality', 'Confidence'], challenges: ['Stubbornness', 'Selfishness', 'Impatience'], ideal: 'Entrepreneur, Executive, Freelancer' },
  2: { title: 'The Diplomat', description: 'You express through cooperation, sensitivity, and partnership. You create through harmony and understanding.', strengths: ['Diplomacy', 'Empathy', 'Patience'], challenges: ['Indecision', 'Over-sensitivity', 'Dependency'], ideal: 'Counsellor, Mediator, Team Player' },
  3: { title: 'The Communicator', description: 'You express through creativity, words, and social interaction. You create through art, writing, or performance.', strengths: ['Creativity', 'Communication', 'Optimism'], challenges: ['Scattered energy', 'Superficiality', 'Moodiness'], ideal: 'Writer, Artist, Entertainer, Teacher' },
  4: { title: 'The Organizer', description: 'You express through structure, discipline, and practical work. You create through building solid systems.', strengths: ['Discipline', 'Reliability', 'Practicality'], challenges: ['Rigidity', 'Stubbornness', 'Over-caution'], ideal: 'Engineer, Manager, Builder, Accountant' },
  5: { title: 'The Versatile', description: 'You express through adaptability, freedom, and variety. You create through change and exploration.', strengths: ['Versatility', 'Curiosity', 'Adaptability'], challenges: ['Restlessness', 'Impulsiveness', 'Inconsistency'], ideal: 'Traveller, Salesperson, Marketer, Journalist' },
  6: { title: 'The Nurturer', description: 'You express through service, responsibility, and care. You create through nurturing and beautifying.', strengths: ['Compassion', 'Dedication', 'Harmony'], challenges: ['Over-giving', 'Control', 'Martyrdom'], ideal: 'Caregiving, Design, Teaching, Nursing' },
  7: { title: 'The Analyst', description: 'You express through analysis, research, and deep specialisation. You create through insight and precision.', strengths: ['Insight', 'Precision', 'Wisdom'], challenges: ['Isolation', 'Skepticism', 'Overthinking'], ideal: 'Researcher, Analyst, Philosopher, Scientist' },
  8: { title: 'The Executive', description: 'You express through business, authority, and material success. You create through leadership and management.', strengths: ['Ambition', 'Confidence', 'Business acumen'], challenges: ['Workaholic tendencies', 'Power struggles', 'Materialism'], ideal: 'Business Owner, Executive, Financial Planner' },
  9: { title: 'The Humanitarian', description: 'You express through compassion, idealism, and service. You create through generosity and universal love.', strengths: ['Generosity', 'Idealism', 'Compassion'], challenges: ['Emotional turbulence', 'Idealism', 'Resentment'], ideal: 'Social Worker, Philanthropist, Artist, Healer' },
  11: { title: 'The Intuitive', description: 'You express through spiritual insight, creativity, and inspiration. You create through visionary ideas.', strengths: ['Intuition', 'Creativity', 'Spiritual awareness'], challenges: ['Nervousness', 'Impracticality', 'Self-doubt'], ideal: 'Spiritual Teacher, Artist, Healer, Inventor' },
  22: { title: 'The Master Builder', description: 'You express through building grand visions into reality. You create lasting impact on a large scale.', strengths: ['Vision', 'Practicality', 'Leadership'], challenges: ['Pressure to succeed', 'Perfectionism', 'Self-doubt'], ideal: 'Architect, World Leader, Entrepreneur, Inventor' },
  33: { title: 'The Master Teacher', description: 'You express through spiritual teaching and healing. You uplift humanity through compassion and wisdom.', strengths: ['Compassion', 'Healing', 'Wisdom'], challenges: ['Emotional sensitivity', 'Self-sacrifice', 'Burden'], ideal: 'Spiritual Teacher, Healer, Counsellor, Artist' },
};

const SOUL_URGE_MEANINGS: Record<number, { title: string; description: string; strengths: string[]; challenges: string[] }> = {
  1: { title: 'Desire to Lead', description: 'Your heart craves independence, recognition, and the freedom to be first. You want to lead and innovate.', strengths: ['Independence', 'Ambition', 'Courage'], challenges: ['Selfishness', 'Dominance', 'Impatience'] },
  2: { title: 'Desire for Harmony', description: 'Your heart craves peace, partnership, and emotional connection. You want to create harmony.', strengths: ['Diplomacy', 'Empathy', 'Patience'], challenges: ['Indecision', 'Over-sensitivity', 'Dependency'] },
  3: { title: 'Desire to Express', description: 'Your heart craves creative expression, joy, and social connection. You want to inspire and entertain.', strengths: ['Creativity', 'Optimism', 'Communication'], challenges: ['Scattered energy', 'Superficiality', 'Moodiness'] },
  4: { title: 'Desire for Security', description: 'Your heart craves stability, order, and lasting foundations. You want to build something that endures.', strengths: ['Discipline', 'Reliability', 'Practicality'], challenges: ['Rigidity', 'Stubbornness', 'Over-caution'] },
  5: { title: 'Desire for Freedom', description: 'Your heart craves adventure, variety, and new experiences. You want to explore life fully.', strengths: ['Versatility', 'Curiosity', 'Adaptability'], challenges: ['Restlessness', 'Impulsiveness', 'Inconsistency'] },
  6: { title: 'Desire to Nurture', description: 'Your heart craves to nurture, beautify, and serve your loved ones and community.', strengths: ['Compassion', 'Dedication', 'Harmony'], challenges: ['Over-giving', 'Control', 'Martyrdom'] },
  7: { title: 'Desire for Truth', description: 'Your heart craves understanding, wisdom, and spiritual depth. You want to know the truth.', strengths: ['Analytical mind', 'Intuition', 'Wisdom'], challenges: ['Isolation', 'Skepticism', 'Overthinking'] },
  8: { title: 'Desire for Abundance', description: 'Your heart craves material success, recognition, and worldly achievement. You want prosperity.', strengths: ['Ambition', 'Confidence', 'Business acumen'], challenges: ['Workaholic tendencies', 'Power struggles', 'Materialism'] },
  9: { title: 'Desire to Serve', description: 'Your heart craves to help humanity, heal the world, and make a difference. You want to serve.', strengths: ['Generosity', 'Idealism', 'Compassion'], challenges: ['Emotional turbulence', 'Idealism', 'Resentment'] },
  11: { title: 'Desire for Spirituality', description: 'Your heart craves spiritual connection, intuition, and higher awareness. You want transcendence.', strengths: ['Intuition', 'Creativity', 'Spiritual awareness'], challenges: ['Nervousness', 'Impracticality', 'Self-doubt'] },
  22: { title: 'Desire to Build', description: 'Your heart craves to build grand visions that serve humanity. You want lasting impact.', strengths: ['Vision', 'Practicality', 'Leadership'], challenges: ['Pressure to succeed', 'Perfectionism', 'Self-doubt'] },
  33: { title: 'Desire to Teach', description: 'Your heart craves to teach, heal, and uplift others through compassion. You want to guide.', strengths: ['Compassion', 'Healing', 'Wisdom'], challenges: ['Emotional sensitivity', 'Self-sacrifice', 'Burden'] },
};

const PERSONALITY_MEANINGS: Record<number, { title: string; description: string }> = {
  1: { title: 'The Confident', description: 'Others see you as confident, direct, and capable of taking charge.' },
  2: { title: 'The Gentle', description: 'Others see you as gentle, diplomatic, and easy to get along with.' },
  3: { title: 'The Charming', description: 'Others see you as charming, social, and full of life.' },
  4: { title: 'The Reliable', description: 'Others see you as dependable, practical, and hardworking.' },
  5: { title: 'The Dynamic', description: 'Others see you as adventurous, versatile, and exciting.' },
  6: { title: 'The Warm', description: 'Others see you as warm, caring, and responsible.' },
  7: { title: 'The Mysterious', description: 'Others see you as thoughtful, reserved, and hard to read.' },
  8: { title: 'The Authoritative', description: 'Others see you as powerful, confident, and business-minded.' },
  9: { title: 'The Compassionate', description: 'Others see you as generous, idealistic, and compassionate.' },
  11: { title: 'The Inspiring', description: 'Others see you as inspiring, intuitive, and spiritually aware.' },
  22: { title: 'The Visionary', description: 'Others see you as a visionary with the ability to build great things.' },
  33: { title: 'The Healing', description: 'Others see you as a natural healer with deep compassion.' },
};

const PLANET_MEANINGS: Record<number, { planet: string; description: string }> = {
  1: { planet: 'Sun', description: 'Authority, vitality, leadership, and self-expression.' },
  2: { planet: 'Moon', description: 'Emotions, intuition, nurturing, and adaptability.' },
  3: { planet: 'Jupiter', description: 'Wisdom, expansion, optimism, and good fortune.' },
  4: { planet: 'Rahu', description: 'Material ambition, unconventional drive, and illusion.' },
  5: { planet: 'Mercury', description: 'Communication, intellect, adaptability, and trade.' },
  6: { planet: 'Venus', description: 'Love, beauty, harmony, and artistic expression.' },
  7: { planet: 'Ketu', description: 'Spiritual liberation, detachment, and inner wisdom.' },
  8: { planet: 'Saturn', description: 'Discipline, responsibility, karma, and long-term success.' },
  9: { planet: 'Mars', description: 'Energy, courage, action, and pioneering spirit.' },
};

const CHAKRA_MEANINGS: Record<number, { chakra: string; symbol: string; description: string }> = {
  1: { chakra: 'Root (Muladhara)', symbol: 'Cho Ku Rei', description: 'Grounding, courage, and a secure foundation.' },
  2: { chakra: 'Sacral (Svadhisthana)', symbol: 'Sei He Ki', description: 'Creativity, pleasure, and emotional flow.' },
  3: { chakra: 'Solar Plexus (Manipura)', symbol: 'Cho Ku Rei', description: 'Personal power, confidence, and self-esteem.' },
  4: { chakra: 'Heart (Anahata)', symbol: 'Sei He Ki', description: 'Love, compassion, and forgiveness.' },
  5: { chakra: 'Throat (Vishuddha)', symbol: 'Hon Sha Ze Sho Nen', description: 'Communication, truth, and expression.' },
  6: { chakra: 'Third Eye (Ajna)', symbol: 'Hon Sha Ze Sho Nen', description: 'Intuition, insight, and inner vision.' },
  7: { chakra: 'Crown (Sahasrara)', symbol: 'Hon Sha Ze Sho Nen', description: 'Spiritual connection and enlightenment.' },
  8: { chakra: 'Root (Muladhara)', symbol: 'Cho Ku Rei', description: 'Grounding, courage, and a secure foundation.' },
  9: { chakra: 'Root (Muladhara)', symbol: 'Cho Ku Rei', description: 'Grounding, courage, and a secure foundation.' },
};

const AURA_MEANINGS: Record<number, { colour: string; practice: string }> = {
  1: { colour: 'Radiant Red', practice: 'A sea-salt bath with a red candle, visualising red light sweeping the aura.' },
  2: { colour: 'Soft Blue', practice: 'Deep breathing exercises with blue light visualisation for calm and clarity.' },
  3: { colour: 'Bright Yellow', practice: 'Creative expression practice with yellow light for confidence and joy.' },
  4: { colour: 'Emerald Green', practice: 'Earthing outdoors, visualising green light sealing and stabilising the aura.' },
  5: { colour: 'Orange', practice: 'Dynamic movement or dance with orange light for vitality and change.' },
  6: { colour: 'Indigo', practice: 'Heart-centered meditation, picturing indigo light dissolving emotional residue.' },
  7: { colour: 'Violet', practice: 'Smudging with sage or palo santo in quiet solitude, bathing the aura in violet light.' },
  8: { colour: 'Gold', practice: 'Wealth visualisation with golden light for abundance and prosperity.' },
  9: { colour: 'White', practice: 'Cleansing shower with white light visualisation for purification and renewal.' },
};

const PANCHATATVA_MEANINGS: Record<string, { name: string; sanskrit: string; numbers: string; description: string; balancing: string[] }> = {
  fire: { name: 'Fire', sanskrit: 'Agni', numbers: '1, 9', description: 'Willpower, vitality, courage, and transformation.', balancing: ['Physical exercise', 'Sun exposure', 'Fire gazing', 'Hot spiced drinks'] },
  earth: { name: 'Earth', sanskrit: 'Prithvi', numbers: '4, 8', description: 'Grounding, stability, patience, and material form.', balancing: ['Gardening', 'Walking barefoot', 'Eating root vegetables', 'Working with clay'] },
  air: { name: 'Air', sanskrit: 'Vayu', numbers: '3', description: 'Intellect, communication, movement, and connection.', balancing: ['Deep pranayama breathing', 'Walking outdoors', 'Speaking truth daily', 'Rhythmic movement'] },
  water: { name: 'Water', sanskrit: 'Jala', numbers: '2, 6, 7', description: 'Emotion, intuition, flow, and receptivity.', balancing: ['Swimming', 'Drinking plenty of water', 'Ocean sounds', 'Emotional journaling'] },
  ether: { name: 'Ether', sanskrit: 'Akash', numbers: '5', description: 'Space, freedom, intuition, and receptivity to the subtle.', balancing: ['Silent meditation', 'Decluttering environment', 'Spending time under open sky', 'Listening to silence'] },
};

// ─── PDF generation helpers ───────────────────────────────────────────────────

function addSectionTitle(doc:jsPDF, y: number, title: string): number {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(212, 168, 83); // gold
  doc.text(title, 20, y);
  doc.setDrawColor(212, 168, 83);
  doc.setLineWidth(0.5);
  doc.line(20, y + 2, 190, y + 2);
  return y + 10;
}

function addSubTitle(doc:jsPDF, y: number, title: string): number {
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text(title, 20, y);
  return y + 6;
}

function addBody(doc:jsPDF, y: number, text: string): number {
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const lines = doc.splitTextToSize(text, 170);
  doc.text(lines, 20, y);
  return y + lines.length * 5;
}

function addBullet(doc:jsPDF, y: number, text: string): number {
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('•', 22, y);
  doc.text(text, 28, y);
  return y + 5;
}

function addKeyValue(doc:jsPDF, y: number, key: string, value: string): number {
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text(key + ':', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const lines = doc.splitTextToSize(value, 130);
  doc.text(lines, 60, y);
  return y + Math.max(lines.length * 5, 5);
}

function checkPage(doc:jsPDF, y: number, needed: number): number {
  if (y + needed > 275) {
    doc.addPage();
    return 20;
  }
  return y;
}

// ─── Main PDF generator ──────────────────────────────────────────────────────

async function generateDetailedPdf(matrix: UnifiedMatrix) {
  const jsPdfModule = await import('jspdf');
  const jsPDF = (jsPdfModule.jsPDF ?? jsPdfModule.default) as typeof import('jspdf').jsPDF;
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

  // ─── Cover Page ──────────────────────────────────────────────────────────
  doc.setFillColor(10, 11, 16);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(212, 168, 83);
  doc.text('STNumerology', 105, 80, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Comprehensive Numerology Report', 105, 95, { align: 'center' });

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(matrix.input.fullName, 105, 130, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 180, 180);
  doc.text(`Born: ${matrix.input.birthDate}`, 105, 145, { align: 'center' });
  if (matrix.input.birthTime) {
    doc.text(`Time: ${matrix.input.birthTime}`, 105, 155, { align: 'center' });
  }
  if (matrix.input.birthCity) {
    doc.text(`Place: ${matrix.input.birthCity}`, 105, 165, { align: 'center' });
  }

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Guidance by Supriya Tambe', 105, 190, { align: 'center' });
  doc.text(`Report Date: ${new Date().toLocaleDateString('en-IN')}`, 105, 200, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('This report is for self-reflection and entertainment only.', 105, 270, { align: 'center' });
  doc.text('It is not medical, legal, or financial advice.', 105, 277, { align: 'center' });

  // ─── Page 2+: Content ────────────────────────────────────────────────────
  doc.addPage();
  let y = 20;

  // ─── Core Numbers Summary ────────────────────────────────────────────────
  y = addSectionTitle(doc, y, 'CORE NUMBERS AT A GLANCE');
  y += 2;

  const coreData = [
    { label: 'Life Path', value: matrix.pythagorean.lifePath, meaning: LIFE_PATH_MEANINGS[matrix.pythagorean.lifePath]?.title || '' },
    { label: 'Expression', value: matrix.pythagorean.expression, meaning: EXPRESSION_MEANINGS[matrix.pythagorean.expression]?.title || '' },
    { label: 'Soul Urge', value: matrix.pythagorean.soulUrge, meaning: SOUL_URGE_MEANINGS[matrix.pythagorean.soulUrge]?.title || '' },
    { label: 'Personality', value: matrix.pythagorean.personality, meaning: PERSONALITY_MEANINGS[matrix.pythagorean.personality]?.title || '' },
    { label: 'Birthday', value: matrix.pythagorean.birthday, meaning: '' },
    { label: 'Maturity', value: matrix.pythagorean.maturity, meaning: '' },
  ];

  for (const core of coreData) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(212, 168, 83);
    doc.text(`${core.label}: ${core.value}`, 20, y);
    if (core.meaning) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`— ${core.meaning}`, 80, y);
    }
    y += 6;
  }

  y += 4;

  // ─── Life Path Detailed ──────────────────────────────────────────────────
  y = checkPage(doc, y, 60);
  y = addSectionTitle(doc, y, 'LIFE PATH — YOUR LIFE PURPOSE');
  y += 2;

  const lp = LIFE_PATH_MEANINGS[matrix.pythagorean.lifePath];
  if (lp) {
    y = addSubTitle(doc, y, `${lp.title} (${matrix.pythagorean.lifePath})`);
    y += 2;
    y = addBody(doc, y, lp.description);
    y += 3;

    y = addSubTitle(doc, y, 'Strengths');
    for (const s of lp.strengths) y = addBullet(doc, y, s);
    y += 2;

    y = addSubTitle(doc, y, 'Challenges');
    for (const c of lp.challenges) y = addBullet(doc, y, c);
    y += 2;

    y = addBody(doc, y, `Ideal Paths: ${lp.ideal}`);
    y += 4;
  }

  // ─── Expression Detailed ─────────────────────────────────────────────────
  y = checkPage(doc, y, 50);
  y = addSectionTitle(doc, y, 'EXPRESSION — YOUR NATURAL TALENT');
  y += 2;

  const ex = EXPRESSION_MEANINGS[matrix.pythagorean.expression];
  if (ex) {
    y = addSubTitle(doc, y, `${ex.title} (${matrix.pythagorean.expression})`);
    y += 2;
    y = addBody(doc, y, ex.description);
    y += 3;

    y = addSubTitle(doc, y, 'Strengths');
    for (const s of ex.strengths) y = addBullet(doc, y, s);
    y += 2;

    y = addSubTitle(doc, y, 'Challenges');
    for (const c of ex.challenges) y = addBullet(doc, y, c);
    y += 2;

    y = addBody(doc, y, `Ideal Paths: ${ex.ideal}`);
    y += 4;
  }

  // ─── Soul Urge Detailed ──────────────────────────────────────────────────
  y = checkPage(doc, y, 50);
  y = addSectionTitle(doc, y, 'SOUL URGE — YOUR HEART\'S DESIRE');
  y += 2;

  const su = SOUL_URGE_MEANINGS[matrix.pythagorean.soulUrge];
  if (su) {
    y = addSubTitle(doc, y, `${su.title} (${matrix.pythagorean.soulUrge})`);
    y += 2;
    y = addBody(doc, y, su.description);
    y += 3;

    y = addSubTitle(doc, y, 'Strengths');
    for (const s of su.strengths) y = addBullet(doc, y, s);
    y += 2;

    y = addSubTitle(doc, y, 'Challenges');
    for (const c of su.challenges) y = addBullet(doc, y, c);
    y += 4;
  }

  // ─── Personality ─────────────────────────────────────────────────────────
  y = checkPage(doc, y, 30);
  y = addSectionTitle(doc, y, 'PERSONALITY — YOUR OUTER SHELL');
  y += 2;

  const pe = PERSONALITY_MEANINGS[matrix.pythagorean.personality];
  if (pe) {
    y = addSubTitle(doc, y, `${pe.title} (${matrix.pythagorean.personality})`);
    y += 2;
    y = addBody(doc, y, pe.description);
    y += 4;
  }

  // ─── Birthday & Maturity ─────────────────────────────────────────────────
  y = checkPage(doc, y, 30);
  y = addSectionTitle(doc, y, 'BIRTHDAY & MATURITY NUMBERS');
  y += 2;

  y = addKeyValue(doc, y, 'Birthday Number', `${matrix.pythagorean.birthday} — Your special gift from birth`);
  y += 2;
  y = addKeyValue(doc, y, 'Maturity Number', `${matrix.pythagorean.maturity} — Who you become after age 35-40`);
  y += 2;
  y = addKeyValue(doc, y, 'Attainment Number', `${matrix.pythagorean.attainment}`);
  y += 6;

  // ─── Pinnacles & Challenges ──────────────────────────────────────────────
  y = checkPage(doc, y, 60);
  y = addSectionTitle(doc, y, 'PINNACLES & CHALLENGES');
  y += 2;

  const pinnacles = matrix.pythagorean.pinnacles;
  const pinnacleAges = matrix.pythagorean.pinnacleAges;
  const challenges = matrix.pythagorean.challenges;

  y = addSubTitle(doc, y, 'Pinnacles (Life Seasons)');
  y += 2;
  y = addKeyValue(doc, y, 'Pinnacle I', `${pinnacles.first} — Until age ${pinnacleAges.firstEnd}`);
  y += 2;
  y = addKeyValue(doc, y, 'Pinnacle II', `${pinnacles.second} — Until age ${pinnacleAges.secondEnd}`);
  y += 2;
  y = addKeyValue(doc, y, 'Pinnacle III', `${pinnacles.third} — Until age ${pinnacleAges.thirdEnd}`);
  y += 2;
  y = addKeyValue(doc, y, 'Pinnacle IV', `${pinnacles.fourth} — After age ${pinnacleAges.thirdEnd}`);
  y += 4;

  y = addSubTitle(doc, y, 'Challenges (Obstacles)');
  y += 2;
  y = addKeyValue(doc, y, 'Challenge I', `${challenges.first}`);
  y += 2;
  y = addKeyValue(doc, y, 'Challenge II', `${challenges.second}`);
  y += 2;
  y = addKeyValue(doc, y, 'Challenge III', `${challenges.third}`);
  y += 2;
  y = addKeyValue(doc, y, 'Challenge IV', `${challenges.fourth}`);
  y += 6;

  // ─── Vedic Reading ───────────────────────────────────────────────────────
  y = checkPage(doc, y, 50);
  y = addSectionTitle(doc, y, 'VEDIC — SANKHYA SHASTRA');
  y += 2;

  y = addSubTitle(doc, y, 'Moolank (Driver) — Your Soul\'s Drive');
  y += 2;
  const driverPlanet = PLANET_MEANINGS[matrix.vedic.moolank];
  y = addKeyValue(doc, y, 'Number', `${matrix.vedic.moolank}`);
  y += 2;
  y = addKeyValue(doc, y, 'Planet', matrix.vedic.moolankPlanet);
  if (driverPlanet) {
    y += 2;
    y = addBody(doc, y, driverPlanet.description);
  }
  y += 4;

  y = addSubTitle(doc, y, 'Bhagyank (Conductor) — Your Destiny');
  y += 2;
  const conductorPlanet = PLANET_MEANINGS[matrix.vedic.bhagyank];
  y = addKeyValue(doc, y, 'Number', `${matrix.vedic.bhagyank}`);
  y += 2;
  y = addKeyValue(doc, y, 'Planet', matrix.vedic.bhagyankPlanet);
  if (conductorPlanet) {
    y += 2;
    y = addBody(doc, y, conductorPlanet.description);
  }
  y += 4;

  y = addSubTitle(doc, y, 'Relationship');
  y += 2;
  y = addKeyValue(doc, y, 'Driver-Conductor', matrix.vedic.driverConductor);
  y += 6;

  // ─── Chaldean & Kabbalah ─────────────────────────────────────────────────
  y = checkPage(doc, y, 40);
  y = addSectionTitle(doc, y, 'CHALDEAN & KABBALAH');
  y += 2;

  y = addSubTitle(doc, y, 'Chaldean');
  y += 2;
  y = addKeyValue(doc, y, 'Name Value', `${matrix.chaldean.nameValue}`);
  y += 2;
  y = addKeyValue(doc, y, 'Single Number', `${matrix.chaldean.single}`);
  y += 2;
  y = addKeyValue(doc, y, 'Compound Number', `${matrix.chaldean.compound}`);
  if (matrix.chaldean.meaning) {
    y += 2;
    y = addKeyValue(doc, y, 'Meaning', matrix.chaldean.meaning.name);
    y += 2;
    y = addBody(doc, y, matrix.chaldean.meaning.summary);
  }
  y += 4;

  y = addSubTitle(doc, y, 'Kabbalah');
  y += 2;
  y = addKeyValue(doc, y, 'Name Value', `${matrix.kabbalah.nameValue}`);
  y += 2;
  y = addKeyValue(doc, y, 'Number', `${matrix.kabbalah.number}`);
  if (matrix.kabbalah.sephira) {
    y += 2;
    y = addKeyValue(doc, y, 'Sephirah', matrix.kabbalah.sephira.name);
    y += 2;
    y = addBody(doc, y, matrix.kabbalah.sephira.meaning);
  }
  y += 6;

  // ─── Personal Cycles ─────────────────────────────────────────────────────
  y = checkPage(doc, y, 30);
  y = addSectionTitle(doc, y, 'PERSONAL CYCLES');
  y += 2;

  y = addKeyValue(doc, y, 'Personal Year', `${matrix.microtiming.personalYear} — Current annual energy`);
  y += 2;
  y = addKeyValue(doc, y, 'Personal Month', `${matrix.microtiming.personalMonth} — Current monthly energy`);
  y += 2;
  y = addKeyValue(doc, y, 'Personal Day', `${matrix.microtiming.personalDay} — Today's energy`);
  y += 6;

  // ─── Lo Shu Grid ─────────────────────────────────────────────────────────
  y = checkPage(doc, y, 60);
  y = addSectionTitle(doc, y, 'LO SHU MAGIC SQUARE');
  y += 2;

  y = addBody(doc, y, 'The 3x3 Lo Shu square places digits 1-9 into a fixed magic grid. Your birth date is tallied into the grid, and the frequency of each digit reveals which planes are active and which numbers are missing.');
  y += 4;

  y = addSubTitle(doc, y, 'Frequency');
  y += 2;
  const freq = matrix.loshu.frequency;
  const freqText = Object.entries(freq).map(([n, c]) => `${n}:${c}`).join('  ');
  y = addBody(doc, y, freqText);
  y += 4;

  y = addSubTitle(doc, y, 'Planes');
  y += 2;
  for (const plane of matrix.loshu.planes) {
    y = checkPage(doc, y, 8);
    const status = plane.active ? 'ACTIVE' : `${plane.strength.toFixed(0)}%`;
    y = addKeyValue(doc, y, plane.name, `${status} — Present: ${plane.presentCount}, Missing: ${plane.missingCount}`);
    y += 1;
  }
  y += 2;

  if (matrix.loshu.missingNumbers.length > 0) {
    y = addSubTitle(doc, y, 'Missing Numbers');
    y += 2;
    y = addBody(doc, y, `Missing: ${matrix.loshu.missingNumbers.join(', ')}`);
    y += 2;
    y = addBody(doc, y, 'Each missing digit signals an energy to consciously develop.');
    y += 4;
  }

  if (matrix.loshu.presentNumbers.length > 0) {
    y = addSubTitle(doc, y, 'Present Numbers');
    y += 2;
    y = addBody(doc, y, `Present: ${matrix.loshu.presentNumbers.join(', ')}`);
    y += 4;
  }

  // ─── Panchatatva ─────────────────────────────────────────────────────────
  y = checkPage(doc, y, 60);
  y = addSectionTitle(doc, y, 'PANCHATATVA — FIVE ELEMENTS');
  y += 2;

  y = addBody(doc, y, 'Each digit in the grid belongs to a tattva. This five-element model is a balance layer for your spiritual wellness.');
  y += 4;

  const panchaElements = ['fire', 'earth', 'air', 'water', 'ether'] as const;
  for (const elem of panchaElements) {
    y = checkPage(doc, y, 20);
    const info = PANCHATATVA_MEANINGS[elem];
    y = addSubTitle(doc, y, `${info.name} (${info.sanskrit}) — Numbers: ${info.numbers}`);
    y += 2;
    y = addBody(doc, y, info.description);
    y += 2;
    y = addBody(doc, y, `Balancing: ${info.balancing.join(', ')}`);
    y += 4;
  }

  // ─── Reiki & Chakra ──────────────────────────────────────────────────────
  y = checkPage(doc, y, 60);
  y = addSectionTitle(doc, y, 'REIKI & CHAKRA ALIGNMENT');
  y += 2;

  y = addBody(doc, y, 'Each core number resonates with a chakra and a Usui Reiki symbol.');
  y += 4;

  const chakraItems = [
    { label: 'Life Path', num: matrix.pythagorean.lifePath },
    { label: 'Expression', num: matrix.pythagorean.expression },
    { label: 'Soul Urge', num: matrix.pythagorean.soulUrge },
    { label: 'Personality', num: matrix.pythagorean.personality },
    { label: 'Birthday', num: matrix.pythagorean.birthday },
    { label: 'Moolank', num: matrix.vedic.moolank },
    { label: 'Bhagyank', num: matrix.vedic.bhagyank },
  ];

  for (const item of chakraItems) {
    y = checkPage(doc, y, 12);
    const chakra = CHAKRA_MEANINGS[item.num] || CHAKRA_MEANINGS[1];
    y = addKeyValue(doc, y, item.label, `${chakra.chakra} — ${chakra.symbol}`);
    y += 1;
  }
  y += 4;

  // ─── Aura Cleaning ───────────────────────────────────────────────────────
  y = checkPage(doc, y, 50);
  y = addSectionTitle(doc, y, 'AURA CLEANING');
  y += 2;

  const auraItems = [
    { label: 'Life Path', num: matrix.pythagorean.lifePath },
    { label: 'Expression', num: matrix.pythagorean.expression },
    { label: 'Soul Urge', num: matrix.pythagorean.soulUrge },
    { label: 'Moolank', num: matrix.vedic.moolank },
    { label: 'Bhagyank', num: matrix.vedic.bhagyank },
  ];

  for (const item of auraItems) {
    y = checkPage(doc, y, 12);
    const aura = AURA_MEANINGS[item.num] || AURA_MEANINGS[1];
    y = addKeyValue(doc, y, `${item.label} (${aura.colour})`, aura.practice);
    y += 1;
  }
  y += 4;

  y = addSubTitle(doc, y, 'Daily Aura-Cleansing Ritual');
  y += 2;
  y = addBullet(doc, y, 'Begin with three slow breaths, exhaling tension through the mouth.');
  y = addBullet(doc, y, 'Sweep both hands over your body from head to toe, flicking away heaviness.');
  y = addBullet(doc, y, 'Visualise white light filling your energy field from the crown downward.');
  y = addBullet(doc, y, 'Set a single positive intention for the day and hold it for ten breaths.');
  y += 6;

  // ─── Pinnacles Details ───────────────────────────────────────────────────
  y = checkPage(doc, y, 50);
  y = addSectionTitle(doc, y, 'LIFE SEASONS — PINNACLE DETAILS');
  y += 2;

  const pinnacleDetails: Record<number, { title: string; description: string }> = {
    1: { title: 'Independence', description: 'A phase of new beginnings, self-reliance, and taking initiative.' },
    2: { title: 'Cooperation', description: 'A phase of partnerships, patience, and sensitivity.' },
    3: { title: 'Expression', description: 'A phase of creativity, communication, and social growth.' },
    4: { title: 'Foundation', description: 'A phase of building, discipline, and establishing order.' },
    5: { title: 'Freedom', description: 'A phase of change, adventure, and new opportunities.' },
    6: { title: 'Responsibility', description: 'A phase of family, service, and domestic harmony.' },
    7: { title: 'Reflection', description: 'A phase of introspection, study, and spiritual growth.' },
    8: { title: 'Power', description: 'A phase of material success, authority, and management.' },
    9: { title: 'Completion', description: 'A phase of letting go, compassion, and universal service.' },
    11: { title: 'Illumination', description: 'A phase of spiritual awakening and intuitive breakthroughs.' },
    22: { title: 'Building', description: 'A phase of manifesting grand visions into reality.' },
    33: { title: 'Teaching', description: 'A phase of spiritual healing and uplifting humanity.' },
  };

  const pd1 = pinnacleDetails[pinnacles.first];
  const pd2 = pinnacleDetails[pinnacles.second];
  const pd3 = pinnacleDetails[pinnacles.third];
  const pd4 = pinnacleDetails[pinnacles.fourth];

  if (pd1) {
    y = addSubTitle(doc, y, `Pinnacle I: ${pinnacles.first} — ${pd1.title} (until age ${pinnacleAges.firstEnd})`);
    y += 2;
    y = addBody(doc, y, pd1.description);
    y += 3;
  }
  if (pd2) {
    y = checkPage(doc, y, 15);
    y = addSubTitle(doc, y, `Pinnacle II: ${pinnacles.second} — ${pd2.title} (until age ${pinnacleAges.secondEnd})`);
    y += 2;
    y = addBody(doc, y, pd2.description);
    y += 3;
  }
  if (pd3) {
    y = checkPage(doc, y, 15);
    y = addSubTitle(doc, y, `Pinnacle III: ${pinnacles.third} — ${pd3.title} (until age ${pinnacleAges.thirdEnd})`);
    y += 2;
    y = addBody(doc, y, pd3.description);
    y += 3;
  }
  if (pd4) {
    y = checkPage(doc, y, 15);
    y = addSubTitle(doc, y, `Pinnacle IV: ${pinnacles.fourth} — ${pd4.title} (after age ${pinnacleAges.thirdEnd})`);
    y += 2;
    y = addBody(doc, y, pd4.description);
    y += 6;
  }

  // ─── Micro-timing ────────────────────────────────────────────────────────
  y = checkPage(doc, y, 30);
  y = addSectionTitle(doc, y, 'MICRO-TIMING — PERSONAL HOUR CLOCK');
  y += 2;

  y = addBody(doc, y, 'Your Personal Hour Clock divides the 24-hour day into 12 two-hour segments, each ruled by a number and planet. Use this to plan your day.');
  y += 4;

  const hours = matrix.microtiming.hourClock;
  for (const h of hours) {
    y = checkPage(doc, y, 8);
    y = addKeyValue(doc, y, `${h.label} (${h.number} - ${h.planet})`, `${h.title}: ${h.affinity}`);
    y += 1;
  }
  y += 4;

  // ─── Big Picture Summary ─────────────────────────────────────────────────
  y = checkPage(doc, y, 80);
  y = addSectionTitle(doc, y, 'THE BIG PICTURE — YOUR LIFE STORY');
  y += 2;

  y = addSubTitle(doc, y, 'Who You Are');
  y += 2;
  const whoYouAre = `You are a ${lp?.archetype?.toLowerCase() || 'leader'} (${matrix.pythagorean.lifePath}) with a natural talent for ${ex?.title?.toLowerCase() || 'analysis'} (${matrix.pythagorean.expression}). Your heart craves ${su?.title?.toLowerCase() || 'nurture'} (${matrix.pythagorean.soulUrge}). Others see you as ${pe?.title?.toLowerCase() || 'confident'} (${matrix.pythagorean.personality}). You have the rare Master Number ${matrix.pythagorean.birthday} — a gift for turning visions into reality.`;
  y = addBody(doc, y, whoYouAre);
  y += 4;

  y = addSubTitle(doc, y, 'Your Unique Combination');
  y += 2;
  y = addBody(doc, y, `Life Path ${matrix.pythagorean.lifePath} + Expression ${matrix.pythagorean.expression} = You lead through ${matrix.pythagorean.expression === 7 ? 'analysis and wisdom' : matrix.pythagorean.expression === 1 ? 'initiative and originality' : 'your natural talents'}.`);
  y += 2;
  y = addBody(doc, y, `Soul Urge ${matrix.pythagorean.soulUrge} = Your heart wants ${matrix.pythagorean.soulUrge === 6 ? 'to nurture and serve' : matrix.pythagorean.soulUrge === 1 ? 'independence and recognition' : 'deep connection'}.`);
  y += 4;

  y = addSubTitle(doc, y, 'Current Chapter');
  y += 2;
  y = addBody(doc, y, `Personal Year ${matrix.microtiming.personalYear} — ${pinnacleDetails[pinnacles.first]?.description || 'A new phase of your life.'}`);
  y += 4;

  y = addSubTitle(doc, y, 'Biggest Growth Areas');
  y += 2;
  if (matrix.loshu.missingNumbers.length > 0) {
    y = addBullet(doc, y, `Develop missing energies: ${matrix.loshu.missingNumbers.join(', ')}`);
  }
  const panchaCount: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0, ether: 0 };
  for (const num of [matrix.pythagorean.lifePath, matrix.pythagorean.expression, matrix.pythagorean.soulUrge, matrix.pythagorean.personality, matrix.pythagorean.birthday, matrix.pythagorean.maturity, matrix.vedic.moolank, matrix.vedic.bhagyank]) {
    if ([1, 9].includes(num)) panchaCount.fire++;
    if ([4, 8].includes(num)) panchaCount.earth++;
    if ([3].includes(num)) panchaCount.air++;
    if ([2, 6, 7].includes(num)) panchaCount.water++;
    if ([5].includes(num)) panchaCount.ether++;
  }
  const absent = Object.entries(panchaCount).filter(([, c]) => c === 0).map(([e]) => e);
  if (absent.length > 0) {
    y = addBullet(doc, y, `Balance absent elements: ${absent.join(', ')}`);
  }
  y += 4;

  y = addSubTitle(doc, y, 'Your Life\'s Work');
  y += 2;
  y = addBody(doc, y, `Build something that matters (${matrix.pythagorean.birthday}) with integrity (${matrix.pythagorean.lifePath}) and intelligence (${matrix.pythagorean.expression}), while caring for the people you serve (${matrix.pythagorean.soulUrge}). That's your complete picture.`);
  y += 8;

  // ─── Disclaimer ──────────────────────────────────────────────────────────
  y = checkPage(doc, y, 20);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('This report is for self-reflection and entertainment only. It is not medical, legal, or financial advice.', 20, y);
  y += 4;
  doc.text('Always consult a qualified professional for health or major life decisions.', 20, y);
  y += 8;
  doc.text('Generated by STNumerology — Guidance by Supriya Tambe', 20, y);

  // Save
  doc.save(`${matrix.input.fullName.replace(/\s+/g, '-').toLowerCase()}-detailed-report.pdf`);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PdfReportButton({ disabled }: PdfReportButtonProps) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { matrix } = useMatrixStore();

  async function generate() {
    if (!matrix) return;
    setError(null);
    setBusy(true);
    try {
      generateDetailedPdf(matrix);
    } catch (err) {
      setError((err as Error).message || t('pdf.error'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button type="button" variant="gold" size="sm" onClick={generate} disabled={disabled || busy}>
        {busy ? t('pdf.generating') : t('pdf.download')}
      </Button>
      {error && <span className="text-xs text-celestial-rose">{error}</span>}
    </div>
  );
}
