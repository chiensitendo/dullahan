/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fill: {
        pinky: '#FBA3FF'
      },
      colors: {
        footer: '#94F0F0'
      },
      textColor: {
        link: '#78A9FF',
        focus: '#0F62FE'
      },
      borderColor: {
        strong: '#8D8D8D',
        interactive: '#0F62FE'
      }
    },
  },
  plugins: [],
}
