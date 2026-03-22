/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0f2218',
          mid: '#1a3a2a',
        },
        gold: {
          DEFAULT: '#c8922a',
          light: '#e8b84b',
          hover: '#b07d22',
          subtle: 'rgba(200, 146, 42, 0.15)',
        },
        cream: {
          DEFAULT: '#fdfaf4',
          dark: '#f5f0e8',
        },
        sage: {
          DEFAULT: '#4a7c59',
          light: '#7aab88',
          bg: 'rgba(74, 124, 89, 0.08)',
        },
        rust: '#b85c38',
        muted: '#5a5a5a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.14)',
        newsletter: '0 40px 80px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
