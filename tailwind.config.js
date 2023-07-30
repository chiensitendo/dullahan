/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'med': '1056px',
        'lar': '1584px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fill: {
        pinky: '#FBA3FF',
        disabled: '#C6C6C6',
        secondary: '#DA1E28',
        primary: '#0F62FE',
        achieved:'#42BE65',
        warn:'#F1C21B',
        low:'#FA4D56',
        text: '#161616'
      },
      colors: {
        footer: '#94F0F0',
        secondary: '#232323',
        primary: '#0F62FE',
        background: '#F4F4F4',
        placeholder: '#A8A8A8',
        good: '#E4FFDD',
        warning: '#FFF3DD',
        bad: '#FFE8E8',
        achieved:'#47D28F',
        warn:'#F1C21B',
        low:'#FA4D56',
      },
      textColor: {
        link: '#78A9FF',
        link_primary: '#0F62FE',
        focus: '#0F62FE',
        helper: '#6F6F6F',
        secondary: '#DA1E28',
        primary: '#161616',
        error: '#DA1E28',
        good: '#198038',
        warning: '#FF8A00',
        bad: '#FF5F37',
        disabled: '#C6C6C6',
      },
      borderColor: {
        strong: '#8D8D8D',
        interactive: '#0F62FE',
        subtle00: "#E0E0E0"
      }
    },
  },
  plugins: [],
}
