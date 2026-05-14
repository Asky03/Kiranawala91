import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ─── Brand ──────────────────────────────────────
        saffron: {
          50: '#FFF4F0',
          100: '#FFE4D9',
          200: '#FFC4AE',
          300: '#FF9D7A',
          400: '#FA7547',
          500: '#E55934', // primary brand
          600: '#C8421E',
          700: '#A33216',
          800: '#7A2310',
          900: '#561709',
        },
        forest: {
          50: '#EDF5EF',
          100: '#D4E7DA',
          200: '#A8CFB5',
          300: '#7CB791',
          400: '#509F6C',
          500: '#2D5F3F', // secondary
          600: '#234B32',
          700: '#1A3825',
          800: '#112418',
          900: '#08120C',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FFF8E7', // background accent
          200: '#FCEEC9',
          300: '#F7DFA0',
          400: '#EFCB76',
        },
        ink: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        // CSS variables set in app/layout.tsx via next/font
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
        soft: '0 2px 8px -2px rgb(15 23 42 / 0.06), 0 4px 12px -2px rgb(15 23 42 / 0.04)',
        'soft-lg': '0 8px 24px -8px rgb(15 23 42 / 0.12), 0 4px 12px -2px rgb(15 23 42 / 0.06)',
        glow: '0 0 0 1px rgb(229 89 52 / 0.2), 0 4px 16px -4px rgb(229 89 52 / 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'grain':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'slow-pulse': 'slow-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
