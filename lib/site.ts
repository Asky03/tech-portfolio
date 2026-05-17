export const site = {
  name: 'Ashutosh Shekhar',
  handle: 'Asky03',
  role: 'Software Developer · Cloud · Backend · GenAI',
  location: 'Bengaluru, India',
  email: 'Ashushekhar2442@gmail.com',
  github: 'https://github.com/Asky03',
  linkedin: 'https://www.linkedin.com/in/ashutoshs27/',
  resumeUrl: '/resume.pdf', // place file in /public/resume.pdf
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ashutoshs.vercel.app',
  description:
    'Portfolio of Ashutosh Shekhar — a software developer focused on backend systems, cloud infrastructure, and AI-powered projects. Currently building CrowdShield.',
  availability: 'Open to internships & software roles',
};

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Connect', href: '#connect' },
];