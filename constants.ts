
import { EventData, WorkshopData, PricePlan } from './types';

export const COLORS = {
  yellow: '#FBBF24',
  orange: '#F97316',
  white: '#FFFFFF',
  bg: '#020617'
};

export const TECH_EVENTS: EventData[] = [
  {
    id: 'innoverge',
    title: 'Innoverge',
    description: 'Build an innovative project showcasing technical expertise, problem-solving, and creativity.',
    category: 'TECH'
  },
  {
    id: 'tech-frontiers',
    title: 'Tech Frontiers',
    description: 'Showcase knowledge and communication skills by presenting a topic with compelling slides.',
    category: 'TECH'
  },
  {
    id: 'code-xtreme',
    title: 'Code Xtreme',
    description: 'Solve problems using C and enhance problem-solving through coding challenges.',
    category: 'TECH'
  },
  {
    id: 'wire-wizards',
    title: 'Wire Wizards',
    description: 'Analyze and debug circuits to identify faults and improve design accuracy.',
    category: 'TECH'
  }
];

export const NON_TECH_EVENTS: EventData[] = [
  {
    id: 'enchanted-quest',
    title: 'Enchanted Quest',
    description: 'Solve riddles, follow clues, and test problem-solving with teamwork.',
    category: 'NON-TECH'
  },
  {
    id: 'cinemania',
    title: 'Cinemania',
    description: 'Prove your film knowledge through movie trivia and challenges.',
    category: 'NON-TECH'
  },
  {
    id: 'sight-solve',
    title: 'Sight & Solve',
    description: 'Logic-based puzzles with animated visual clues.',
    category: 'NON-TECH'
  },
  {
    id: 'visual-extraction',
    title: 'Visual Extraction',
    description: 'Identify famous logos with glitch and distortion effects.',
    category: 'NON-TECH'
  }
];

export const WORKSHOPS: WorkshopData[] = [
  {
    id: 'ws-1',
    title: 'Smart Embedded Systems: AI-Powered Solutions with STM32',
    points: [
      'Embedded Systems Fundamentals',
      'STM32 Hardware Setup',
      'Peripheral Interfacing',
      'Nano Edge AI Introduction',
      'AI Model Training & Deployment',
      'Real-Time Decision Making',
      'Hands-on Session'
    ],
    coordinator: 'Kingston S',
    phone: '9488126077'
  },
  {
    id: 'ws-2',
    title: 'Microstrip Patch Antenna Design (Ansys HFSS)',
    points: [
      'Antenna Basics',
      'Design Parameters',
      'HFSS Overview',
      'Simulation Steps',
      'Performance Analysis',
      'Optimization Techniques',
      'Substrate Selection',
      'Boundary Conditions',
      'Hands-on Session'
    ],
    coordinator: 'NavinKumar S',
    phone: '6374248910'
  }
];

export const PLANS: PricePlan[] = [
  { title: 'Basic Plan', price: 249, features: 'All Tech & Non-Tech Events' },
  { title: 'Workshop Only', price: 149, features: 'Access to 1 Workshop' },
  { title: 'Pro Plan', price: 399, features: 'All Events + 1 Workshop' },
  { title: 'Expert Plan', price: 999, features: '3 Members + Events & Workshop' },
  { title: 'Elite Plan', price: 999, features: '4+1 Members Special' }
];
