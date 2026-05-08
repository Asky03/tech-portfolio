export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'Solidity'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'Firebase', 'Supabase', 'PostgreSQL'],
  },
  {
    category: 'Cloud / DevOps',
    items: ['AWS', 'Vercel', 'Render', 'Firebase Hosting', 'Docker', 'GitHub Actions'],
  },
  {
    category: 'Security',
    items: ['JWT', 'Firebase Auth', 'AES Encryption', 'SHA-256', 'OWASP Basics'],
  },
  {
    category: 'AI / ML',
    items: ['TensorFlow', 'Keras', 'CNN', 'YOLOv8', 'LangChain', 'RAG'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Canva'],
  },
];
