import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Page surfaces — true monochrome, no blue
        ink: {
          950: '#050506',
          900: '#0a0a0b',
          800: '#131316',
          700: '#1f1f23',
        },
        // Bone — the warm off-white that replaces white
        bone: {
          DEFAULT: '#f5f1e8',
          dim: '#a8a399',
          faint: '#6f6b62',
        },
        // Ember — the only accent color, used sparingly
        accent: {
          DEFAULT: '#d4a574',
          warm: '#d4a574',     // alias kept for backward compat
          mint: '#d4a574',     // collapsed to ember (was teal in old palette)
          violet: '#d4a574',   // collapsed to ember (was purple in old palette)
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 18s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'marquee': 'marquee 50s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;