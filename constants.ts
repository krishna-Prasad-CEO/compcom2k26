
// import { EventData, WorkshopData, PricePlan } from './types';

// export const COLORS = {
//   yellow: '#FBBF24',
//   orange: '#F97316',
//   white: '#FFFFFF',
//   bg: '#020617'
// };

// export const TECH_EVENTS: EventData[] = [
//   {
//     id: 'innoverge',
//     title: 'Innoverge',
//     description: 'Build an innovative project showcasing technical expertise, problem-solving, and creativity.',
//     category: 'TECH'
//   },
//   {
//     id: 'tech-frontiers',
//     title: 'Tech Frontiers',
//     description: 'Showcase knowledge and communication skills by presenting a topic with compelling slides.',
//     category: 'TECH'
//   },
//   {
//     id: 'code-xtreme',
//     title: 'Code Xtreme',
//     description: 'Solve problems using C and enhance problem-solving through coding challenges.',
//     category: 'TECH'
//   },
//   {
//     id: 'wire-wizards',
//     title: 'Wire Wizards',
//     description: 'Analyze and debug circuits to identify faults and improve design accuracy.',
//     category: 'TECH'
//   }
// ];

// export const NON_TECH_EVENTS: EventData[] = [
//   {
//     id: 'enchanted-quest',
//     title: 'Enchanted Quest',
//     description: 'Solve riddles, follow clues, and test problem-solving with teamwork.',
//     category: 'NON-TECH'
//   },
//   {
//     id: 'cinemania',
//     title: 'Cinemania',
//     description: 'Prove your film knowledge through movie trivia and challenges.',
//     category: 'NON-TECH'
//   },
//   {
//     id: 'sight-solve',
//     title: 'Sight & Solve',
//     description: 'Logic-based puzzles with animated visual clues.',
//     category: 'NON-TECH'
//   },
//   {
//     id: 'visual-extraction',
//     title: 'Visual Extraction',
//     description: 'Identify famous logos with glitch and distortion effects.',
//     category: 'NON-TECH'
//   }
// ];

// export const WORKSHOPS: WorkshopData[] = [
//   {
//     id: 'ws-1',
//     title: 'Smart Embedded Systems: AI-Powered Solutions with STM32',
//     points: [
//       'Embedded Systems Fundamentals',
//       'STM32 Hardware Setup',
//       'Peripheral Interfacing',
//       'Nano Edge AI Introduction',
//       'AI Model Training & Deployment',
//       'Real-Time Decision Making',
//       'Hands-on Session'
//     ],
//     coordinator: 'Kingston S',
//     phone: '9488126077'
//   },
//   {
//     id: 'ws-2',
//     title: 'Microstrip Patch Antenna Design (Ansys HFSS)',
//     points: [
//       'Antenna Basics',
//       'Design Parameters',
//       'HFSS Overview',
//       'Simulation Steps',
//       'Performance Analysis',
//       'Optimization Techniques',
//       'Substrate Selection',
//       'Boundary Conditions',
//       'Hands-on Session'
//     ],
//     coordinator: 'NavinKumar S',
//     phone: '6374248910'
//   }
// ];

// export const PLANS: PricePlan[] = [
//   { title: 'Basic Plan', price: 249, features: 'All Tech & Non-Tech Events for 1 member' },
//   { title: 'Workshop Only', price: 149, features: '1 member Access to 1 Workshop' },
//   { title: 'Pro Plan', price: 399, features: '1 member access to All Events + 1 Workshop' },
//   { title: 'Expert Plan', price: 999, features: '3 Members access to all Events & 1 Workshop' },
//   { title: 'Elite Plan', price: 999, features: '4+1 Members Special access for all events' }
// ];

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
    title: 'Project Expo',
    description: 'Showcase your innovative project with a live demonstration before an expert panel. Evaluation is based on creativity, technical depth, presentation, and real-world impact.',
    category: 'TECH',
    type: 'TEAM_MAX_4'
  },
  {
    id: 'tech-frontiers',
    title: 'PowerPoint Presentation',
    description: 'Present advanced ideas with clarity and confidence. Judging focuses on originality, content quality, delivery, and effective Q&A handling.',
    category: 'TECH',
    type: 'INDIVIDUAL_OR_DUO'
  },
  {
    id: 'code-xtreme',
    title: 'Coding Contest',
    description: 'Test your programming logic and debugging skills through challenging problem-solving rounds. Speed, accuracy, and analytical thinking determine the top performer.',
    category: 'TECH',
    type: 'SOLO'
  },
  {
    id: 'wire-wizards',
    title: 'Circuit Debugging',
    description: 'Identify faults and solve conceptual circuit challenges within a time limit. Technical precision and troubleshooting skills are key to winning.',
    category: 'TECH',
    type: 'SOLO'
  }
];

export const NON_TECH_EVENTS: EventData[] = [
  {
    id: 'enchanted-quest',
    title: 'Treasure Hunt',
    description: 'Follow clues, solve puzzles, and race against time to uncover the hidden treasure. Strategy, coordination, and teamwork lead to victory.',
    category: 'NON-TECH',
    type: 'TEAM'
  },
  {
    id: 'cinemania',
    title: 'Movie Quiz',
    description: 'Challenge your cinematic knowledge with exciting and competitive quiz rounds. Quick recall and sharp observation give you the winning edge.',
    category: 'NON-TECH',
    type: 'SOLO'
  },
  {
    id: 'sight-solve',
    title: 'Connection',
    description: 'Analyze visual clues and discover the hidden link between them. Logical reasoning and pattern recognition unlock the final answer.',
    category: 'NON-TECH',
    type: 'TEAM_MAX_2'
  },
  {
    id: 'visual-extraction',
    title: 'Logo Finding',
    description: 'Identify and decode famous logos through observation and brand awareness. Attention to detail and fast recognition secure your win.',
    category: 'NON-TECH',
    type: 'TEAM_MAX_2'
  }
];
export const WORKSHOPS: WorkshopData[] = [
  {
    id: 'ws-1',
    title: 'CCNA Networking fundamentals',
    points: [
      'CCNA-Aligned Curriculum',
      'Learn IP addressing',
      'Subnetting and VLANs',
      'Hands-On Experience using cisco packet tracer',
      'Practical Labs',
      'Certification'
    ],
    coordinator: 'Illayavarman K',
    phone: '9384381422'
  },
  {
    id: 'ws-2',
    title: 'FOUNDATIONS OF IC DESIGN AND VERIFICATION',
    points: [
      'RTL simulation practice',
      'SV & Testbench basics',
      'Simulation and waveform analysis',
      'Assertion & coverage',
      'Debugging',
      'Practical lab sessions',
      'Certification'
    ],
    coordinator: 'Sivananthan  S',
    phone: '7708297756'
  }
];

export const PLANS: PricePlan[] = [
  { title: 'Basic Plan', price: 249, features: 'All Tech & Non-Tech Events for 1 member', link: "https://docs.google.com/forms/d/e/1FAIpQLSdsX_53T4A0VvYB_ibb_H3BcSDUCf3kOzqyesXQDt04lVOL3Q/viewform?usp=publish-editor" },
  { title: 'Workshop Only', price: 199, features: '1 member Access to 1 Workshop', link: "https://docs.google.com/forms/d/e/1FAIpQLSdTetaGvbl51rOPWMlZLJLMtx3IOEOV0Dto1im9_A-B9dAMSw/viewform?usp=publish-editor" },
  { title: 'Pro Plan', price: 399, features: '1 member access to All Events + 1 Workshop', link: "https://docs.google.com/forms/d/e/1FAIpQLSdjOObV8alxsteNUQGr2CLlpik_EH9Qb2xFlx9Z5YdmNcCyug/viewform?usp=publish-editor" },
  { title: 'Expert Plan', price: 999, features: '3 Members access to all Events & 1 Workshop', link: "https://docs.google.com/forms/d/e/1FAIpQLSfJebDbNt849-m6rofhkIOkiYJxVS06vMIF1LngyEDwqtoSmg/viewform?usp=publish-editor" },
  { title: 'Elite Plan', price: 999, features: '4+1 Members Special access for all events', link: "https://docs.google.com/forms/d/e/1FAIpQLSd18Q7NzDEcOSst-AEh18NlaT-psstUnRqNku2pA5ZpBW5FCw/viewform?usp=publish-editor" }
];

export const CONTACTS = [
  { name: 'Madhan Kumar R', phone: '7418870807' },
  { name: 'Sunil Kumar S', phone: '9942430802' },
  { name: 'Sivananthan S', phone: '7708297756' },
  { name: 'Sandhiya G', phone: '6382074465' },
  { name: 'Muthukala V', phone: '6369174089' }
];
