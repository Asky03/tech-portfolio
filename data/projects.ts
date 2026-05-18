export type ProjectCategory = 'GenAI' | 'Cloud' | 'Blockchain' | 'Web' | 'AI/ML';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  badges: string[];
  tech: string[];
  problem: string;
  role: string;
  features: string[];
  impact?: string;

  /** Path under /public, e.g. "/images/projects/crowdshield.png".
   *  16:10 ratio recommended. Leave undefined if no screenshot yet. */
  cover?: string;
  coverAlt?: string;

  codeUrl?: string;
  liveUrl?: string;
  status?: 'shipped' | 'building' | 'concept';
  featured?: boolean;

  deepDive?: {
    keyDecision?: { title: string; body: string };
    hardestProblem?: { title: string; body: string };
    nextMilestone?: string;
    showableToday?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'crowdshield',
    title: 'CrowdShield',
    tagline: 'AI crowd-density monitoring with cloud-based risk alerting',
    category: 'AI/ML',
    badges: ['AI/ML', 'Cloud', 'Backend'],
    tech: ['Python', 'YOLO', 'Node.js', 'Express', 'React/Next.js', 'AWS'],
    problem:
      'Large public events have no real-time signal for dangerous crowd density until incidents already occur. Manual surveillance is slow, reactive, and inconsistent across venue types and event sizes.',
    role:
      'End-to-end build — detection pipeline, backend APIs, frontend dashboard, and cloud integration plan.',
    features: [
      'YOLO-based person detection on images and video frames',
      'Crowd density and risk-level estimation logic with configurable thresholds',
      'Node/Express backend exposing analysis and alert APIs',
      'React/Next.js dashboard for surfacing risk metrics',
      'Planned AWS integration for image storage and alerting workflows',
    ],
    impact:
      'Working local prototype that processes crowd images, detects people, and produces a risk estimate — foundation for the deployable system.',
    codeUrl: 'https://github.com/Asky03/Crowdshield1',
    status: 'building',
    featured: true,
    deepDive: {
      keyDecision: {
        title: 'YOLO-based detection for the MVP',
        body: 'I picked a YOLO detection pipeline because it gives practical person-detection on real footage, is easy to demonstrate visually, and leaves a clean path to extend later with density estimation, heatmaps, and real-time alerting. Choosing a simpler proven pipeline over a heavier research model meant the project could actually ship as a prototype.',
      },
      hardestProblem: {
        title: '"Dangerous density" is not a single number',
        body: 'Risk thresholds change based on camera angle, venue type, crowd movement, and event size — a number that\'s safe at a wedding is dangerous at a stampede-prone procession. Working on configurable presets and context-aware thresholds rather than a single global value.',
      },
      showableToday:
        'Public repo, local prototype that runs on sample images and produces a risk estimate, plus the architecture for the backend/cloud alerts.',
      nextMilestone:
        'Polish the backend and ML pipeline, wire up image upload + storage, deploy a working demo, and ship a recruiter-ready README.',
    },
  },
  {
    id: 'docuai',
    title: 'DocuAi',
    tagline: 'AI document Q&A and summarizer with a RAG pipeline',
    category: 'GenAI',
    badges: ['GenAI', 'RAG', 'Summarization'],
    tech: ['Python', 'LangChain', 'FAISS', 'Flan-T5', 'Streamlit'],
    problem:
      'Reading and pulling structured info out of long documents is slow. Existing tools are either too generic or too expensive for personal/academic use.',
    role: 'Solo build — pipeline design, embedding strategy, UI.',
    features: [
      'PDF → chunk → embeddings → answer pipeline',
      'FAISS-based vector retrieval for semantic search',
      'Flan-T5 for grounded summarization and Q&A',
      'Streamlit interface for conversational document chat',
    ],
    impact:
      'Working RAG prototype that handles multi-page documents and produces readable summaries and accurate retrieval.',
    codeUrl: 'https://github.com/Asky03/GenAimodel',
    status: 'shipped',
    featured: true,
  },
  {
    id: 'secure-vault',
    title: 'A Secure Vault',
    tagline: 'Encrypted personal storage with strong auth',
    category: 'Cloud',
    badges: ['Cloud', 'Security'],
    tech: ['Firebase', 'AES-256', 'SHA-256', 'JavaScript'],
    problem:
      'Most personal storage apps trust the provider with plaintext data. Users need a vault where the host cannot read their files.',
    role: 'Solo build — auth flow, encryption layer, storage rules.',
    features: [
      'Firebase Auth with role-based access patterns',
      'Client-side AES encryption before upload',
      'SHA-256 integrity hashing on stored blobs',
      'Designed for scalable cloud deployment',
    ],
    impact:
      'Working prototype demonstrating encryption-first thinking. Future scope: audit logs, rule hardening, deduplication.',
    codeUrl: 'https://github.com/Asky03/SCV01',
    status: 'shipped',
    featured: true,
  },
  {
    id: 't3trust',
    title: 'T3TRUST',
    tagline: 'Decentralized micro-credit with trust scoring',
    category: 'Blockchain',
    badges: ['Blockchain', 'Trust', 'Ledger'],
    tech: ['Solidity', 'Hardhat', 'Truffle', 'Node.js'],
    problem:
      'Underbanked users in tier-3 cities have no transparent way to access emergency micro-credit with auditable trust signals.',
    role: 'Concept design and smart-contract scaffolding.',
    features: [
      'Trust-scoring concept tied to on-chain history',
      'Ledger-style records for traceability',
      'Prototype contract structured for expansion',
    ],
    codeUrl: 'https://github.com/Asky03/t3trust',
    status: 'concept',
  },
  {
    id: 'greet-dapp',
    title: 'Greet DApp',
    tagline: 'Ethereum greeting contract with MetaMask UI',
    category: 'Blockchain',
    badges: ['Blockchain', 'Web3'],
    tech: ['Solidity', 'Ethers.js v5', 'MetaMask', 'Hardhat'],
    problem: 'Hands-on practice deploying and interacting with smart contracts end-to-end.',
    role: 'Solo learning project.',
    features: [
      'Solidity contract storing and updating a greeting',
      'Ethers.js v5 read/write integration',
      'MetaMask wallet connection in the browser',
    ],
    codeUrl: 'https://github.com/Asky03/Greet-Dapp',
    status: 'shipped',
  },
  {
    id: 'kiranawala',
    title: 'Kiranawala',
    tagline: 'Local kirana management for tier-3 cities',
    category: 'Web',
    badges: ['Web', 'Full Stack'],
    tech: ['JavaScript', 'Node.js', 'MongoDB', 'Express'],
    problem:
      'Kirana shops in tier-3 cities lack a lightweight digital layer for orders, inventory, and customer connection.',
    role: 'Backend and data model design.',
    features: [
      'Workflow-driven design rooted in real shop ops',
      'Backend-ready MongoDB schema',
      'Scalable structure for future admin panel and analytics',
    ],
    codeUrl: 'https://github.com/Asky03/Kiranawala91',
    status: 'concept',
  },
];

export const categories: Array<ProjectCategory | 'All'> = [
  'All',
  'AI/ML',
  'GenAI',
  'Cloud',
  'Blockchain',
  'Web',
];