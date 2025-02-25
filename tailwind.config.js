const { m } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffffeb',
        secondary: '#BABABA',
        accent: '#ffffff',
        // accent: "#ff9a90",
        cards: '#a4a4a433',
        cards2: '#a4a4a421',
        cards3: '#2b2b2be2',
        hoverbg: '#8a8a8a',
        headerCard: '#a4a4a433',
        energybar: '#1D1D1D',
        btn: '#ff695a',
        // btn: "#c67e77",
        btn2: '#00000066',
        btn4: '#ffffff',
        taskicon: '#6b69699c',
        divider: '#efeff1',
        borders: '#42361c',
        borders2: 'rgb(54, 54, 54)',
        energybar: '#1D1D1D',
        accent2: '#bcbcbc',
        cardtext: '#e7e7e7',
        lime: '#e1f75c',
        dimtext: '#ffffff71',
        divider2: '#554f3f',
        divider3: '#393D43',
        modal: '#303030',
        'purple-600': '#9333ea',
        'pink-500': '#ec4899',
        'yellow-400': '#fbbf24',
        'orange-500': '#f97316',
        'gray-700': '#4b5563',
        'blue-500': '#3B82F6',
        'blue-700': '#1D4ED8',
      },
      boxShadow: {
        xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      transitionProperty: {
        transform: 'transform',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        Inter: ["'Inter', sans-serif"],
        outfit: ["'Outfit', sans-serif"],
        RobotoMono: ["'Roboto Mono', monospace"],
        PublicSans: ["'Public Sans', sans-serif"],
        Monserrat: ["'Montserrat', sans-serif"],
        Syne: ["'Syne', sans-serif"],
        Orkney: ["'Orkney', sans-serif"],
        Cerebri: ["'Cerebri Sans', sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
    screens: {
      xs: '480px',
      ss: '600px',
      sm: '768px',
      ms: '1024px',
      md: '1140px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [require('tailwindcss')],
};
