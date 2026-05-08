export interface Note {
  id: string;
  title: string;
  excerpt: string;
  topic: 'Cloud' | 'DevOps' | 'Backend' | 'AI/ML' | 'Security';
  date: string; // YYYY-MM-DD
  readTime: string;
  url?: string; // external link (Medium, Hashnode, dev.to) — leave undefined for "draft"
}

// TODO: Replace with real notes/blog posts. These are starter placeholders.
export const notes: Note[] = [
  {
    id: 'aws-iam-mental-model',
    title: 'A mental model for AWS IAM that finally clicked',
    excerpt:
      'Principal, action, resource, condition — once I stopped reading IAM as JSON and started reading it as a sentence, policies got readable.',
    topic: 'Cloud',
    date: '2025-09-12',
    readTime: '6 min',
    // url: 'https://your-blog/aws-iam'
  },
  {
    id: 'rag-without-the-hype',
    title: 'RAG without the hype: what actually moves accuracy',
    excerpt:
      'Chunk size, embedding model, and retrieval cutoff matter more than the LLM. Notes from building DocuAi.',
    topic: 'AI/ML',
    date: '2025-08-04',
    readTime: '8 min',
  },
  {
    id: 'docker-for-dev-not-prod',
    title: 'Why I dockerize my dev env before my prod build',
    excerpt:
      'A messy dev machine cost me a weekend of debugging. Here\u2019s the minimal Dockerfile I now start every project with.',
    topic: 'DevOps',
    date: '2025-07-21',
    readTime: '5 min',
  },
];
