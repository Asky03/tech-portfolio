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
  codeUrl?: string;
  liveUrl?: string;
  status?: 'shipped' | 'building' | 'concept';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'crowdshield',
    title: 'CrowdShield',
    tagline: 'AI-powered crowd monitoring & early warning platform',
    category: 'AI/ML',
    badges: ['AI/ML', 'Cloud', 'Backend'],
    tech: ['Python', 'YOLOv8', 'FastAPI', 'AWS', 'TensorFlow', 'Docker'],
    problem:
      'Large public events have no real-time signal for dangerous crowd density until incidents already occur. Manual surveillance is slow and reactive.',
    role:
      'Backend architecture, API integration, testing workflows, cloud deployment planning, and dashboard integration.',
    features: [
      'Crowd density detection pipeline using YOLOv8 + density estimation',
      'REST APIs for live frame analysis and alert webhooks',
      'Unit, integration, and system tests covering core flows',
      'Dashboard surfacing live crowd metrics and threshold alerts',
      'Deployment plan for AWS with autoscaling for inference workers',
    ],
    impact:
      'Validated detection accuracy on test footage and built a deployable backend ready for pilot integration with event-management systems.',
    status: 'building',
    featured: true,
    // TODO: add codeUrl when repo is public
  },
  {
    id: 'docuai',
    title: 'DocuAi',
    tagline: 'AI document Q&A + summarizer with RAG pipeline',
    category: 'GenAI',
    badges: ['GenAI', 'RAG', 'Summarization'],
    tech: ['Python', 'MiniLM', 'Flan-T5', 'FAISS', 'Streamlit'],
    problem:
      'Reading and extracting structured info from long docs is tedious. Existing tools are either too generic or too expensive.',
    role: 'Solo build — pipeline design, embedding strategy, UI.',
    features: [
      'File → chunk → embeddings → answer pipeline',
      'MiniLM sentence embeddings for semantic retrieval',
      'Flan-T5 for grounded summarization and Q&A',
      'Clean GitHub-ready structure and deployable UI',
    ],
    impact:
      'Working RAG prototype that handles multi-page documents with readable summaries and accurate retrieval.',
    codeUrl: 'https://github.com/Asky03/GenAimodel',
    status: 'shipped',
    featured: true,
  },
  {
    id: 'secure-vault',
    title: 'A Secure Vault',
    tagline: 'Encrypted local storage with strong auth',
    category: 'Cloud',
    badges: ['Cloud', 'Security'],
    tech: ['Firebase', 'AES-256', 'SHA-256', 'JavaScript'],
    problem:
      'Most personal storage apps trust the provider with plaintext data. Users need a vault where the host cannot read their files.',
    role: 'Solo build — auth flow, encryption layer, storage rules.',
    features: [
      'Firebase Auth with strong access patterns',
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
    role: 'Concept design + smart-contract scaffolding.',
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
      'Solidity contract storing & updating a greeting',
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
    role: 'Backend & data model design.',
    features: [
      'Workflow-driven design rooted in real shop ops',
      'Backend-ready MongoDB schema',
      'Scalable structure for future admin panel + analytics',
    ],
    codeUrl: 'https://github.com/Asky03/Kiranawala-',
    status: 'shipped',
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
