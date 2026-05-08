export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  status: 'Completed' | 'In Progress';
  url?: string;
}

export const certifications: Certification[] = [
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Foundations',
    issuer: 'AWS Academy',
    year: '2025',
    skills: ['EC2', 'S3', 'IAM', 'VPC'],
    status: 'Completed',
    // TODO: paste verification URL if you have one
  },
  {
    id: 'genai-essentials',
    title: 'GenAI Essentials',
    issuer: 'Coursera',
    year: '2025',
    skills: ['LLMs', 'Embeddings', 'RAG'],
    status: 'Completed',
  },
  {
    id: 'cybersec-fundamentals',
    title: 'Cybersecurity Fundamentals',
    issuer: 'Online Course',
    year: '2024',
    skills: ['Networks', 'OWASP', 'Auth'],
    status: 'Completed',
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    issuer: 'Training Platform',
    year: '2025',
    skills: ['HTML', 'CSS', 'JS', 'UI'],
    status: 'Completed',
  },
];
