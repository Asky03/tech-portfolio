export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  tags?: string[];
}

// TODO: Fill in real entries. The placeholders below should be replaced or removed.
// Keep period format consistent: "Mon YYYY – Mon YYYY" or "Mon YYYY – Present".
export const experience: ExperienceItem[] = [
  {
    id: 'placeholder-1',
    role: 'Software Developer Intern', // TODO: replace with real role
    org: 'Company Name', // TODO: replace
    period: 'MMM YYYY – Present', // TODO: replace
    location: 'Bengaluru, India',
    bullets: [
      'TODO: bullet about a real impact metric (e.g. shipped X feature used by Y users)',
      'TODO: bullet about technical work (stack, scope, ownership)',
      'TODO: bullet about collaboration / scale / outcome',
    ],
    tags: ['Node.js', 'AWS', 'REST APIs'],
  },
  {
    id: 'placeholder-2',
    role: 'Coding Club / Tech Lead', // TODO: replace if applicable
    org: 'Your College / Club',
    period: 'YYYY – YYYY',
    bullets: [
      'TODO: leadership bullet',
      'TODO: project / event bullet',
    ],
    tags: ['Leadership', 'Mentorship'],
  },
];
