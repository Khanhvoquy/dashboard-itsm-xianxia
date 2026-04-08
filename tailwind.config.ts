import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        xianxia: {
          ink: '#1a1510',
          'ink-light': '#2a2218',
          parchment: '#2d2418',
          'parchment-light': '#3d3020',
          gold: '#d4af37',
          'gold-light': '#f4cf57',
          'gold-dark': '#b48f17',
          crimson: '#8b0000',
          'crimson-light': '#ab2020',
          'crimson-dark': '#6b0000',
          jade: '#00a86b',
          'jade-light': '#20c88b',
          'jade-dark': '#00884b',
          bronze: '#4a3728',
          'bronze-light': '#6a5748',
          silver: '#c0c0c0',
          'silver-light': '#e0e0e0',
          'paper-text': '#e8dcc8',
          'paper-text-muted': '#c8bcc8',
          'paper-text-dark': '#a89c88',
        },
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.4)',
        'glow-crimson': '0 0 20px rgba(139, 0, 0, 0.3)',
        'glow-jade': '0 0 20px rgba(0, 168, 107, 0.3)',
        'inset-ink': 'inset 0 0 30px rgba(26, 21, 16, 0.8)',
        card: '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-xianxia': 'linear-gradient(135deg, #d4af37 0%, #8b0000 100%)',
        'gradient-xianxia-horizontal': 'linear-gradient(90deg, #d4af37 0%, #8b0000 100%)',
        'gradient-ink': 'linear-gradient(180deg, #1a1510 0%, #2d2418 100%)',
        'gradient-parchment': 'linear-gradient(135deg, #2d2418 0%, #3d3020 100%)',
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'ink-reveal': 'ink-reveal 0.4s ease-out forwards',
        'particle-drift': 'particle-drift 8s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'mist-flow': 'mist-flow 10s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 35px rgba(212, 175, 55, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'ink-reveal': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'particle-drift': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '25%': { transform: 'translate(10px, -20px) rotate(90deg)', opacity: '0.8' },
          '50%': { transform: 'translate(-10px, -40px) rotate(180deg)', opacity: '0.5' },
          '75%': { transform: 'translate(10px, -20px) rotate(270deg)', opacity: '0.8' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'mist-flow': {
          '0%': { transform: 'translateX(-10%) translateY(-5%)', opacity: '0.3' },
          '50%': { transform: 'translateX(10%) translateY(5%)', opacity: '0.5' },
          '100%': { transform: 'translateX(-10%) translateY(-5%)', opacity: '0.3' },
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
