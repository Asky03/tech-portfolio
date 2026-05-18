export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  tags?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'rvu-cloud-research',
    role: 'Cloud Developer Intern — Cloud Research Project',
    org: 'RV University',
    period: 'Jun 2025 – Present',
    location: 'Bengaluru, India',
    bullets: [
      'Built a secure cloud-based file storage system using Firebase, AES encryption, JWT authentication, and role-based access workflows.',
      'Integrated Firebase Auth, Firestore, and Firebase Storage with backend APIs to support secure file upload, access control, and storage management.',
      'Improved project maintainability through modular architecture, technical documentation, Git/GitHub workflows, and testing/deployment practices.',
    ],
    tags: ['Firebase', 'AES Encryption', 'JWT', 'Cloud Security', 'GitHub'],
  },
  {
    id: 'rvu-genai-research',
    role: 'Software Engineering Intern — GenAI Research Project',
    org: 'RV University',
    period: 'Jun 2024 – Aug 2024',
    location: 'Bengaluru, India',
    bullets: [
      'Developed a generative-AI chatbot for PDF-based question answering using LangChain and local LLMs.',
      'Implemented FAISS-based vector embeddings and built a conversational interface using Streamlit for document Q&A.',
      'Created a GitHub repository, README, local MVP setup, and architecture documentation to make the project reproducible.',
    ],
    tags: ['Python', 'LangChain', 'FAISS', 'Flan-T5', 'Streamlit'],
  },
  {
    id: 'viksha-ieee-design',
    role: 'Design Lead & Web Developer',
    org: 'Viksha Coding Club · IEEE RVU Student Chapter',
    period: 'Apr 2024 – Present',
    location: 'Bengaluru, India',
    bullets: [
      'Led UI/UX, branding, logo design, event posters, and social media creatives for student technical communities.',
      'Maintained and improved club websites using HTML, CSS, and JavaScript while resolving UI/UX issues.',
      'Coordinated website and design updates for public-facing club activities, improving visual consistency and student engagement.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Canva'],
  },
];