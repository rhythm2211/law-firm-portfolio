/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F2EC',
        ink: '#11151C',
        ink2: '#1B2230',
        ash: '#5E636E',
        border: '#E4DFD3',
        brand: '#C8531D',
        brandSoft: '#E8551F',
        brandLight: '#F0A36C',
        gold: '#B58A4C',
        cream: '#FBF9F4',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
