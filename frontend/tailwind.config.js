/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        surface: {
          DEFAULT: '#f5f5f7',
          elevated: '#ffffff',
        },
        label: {
          primary: '#1d1d1f',
          secondary: '#6e6e73',
          tertiary: '#86868b',
        },
        accent: '#0071e3',
        'accent-hover': '#0077ed',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'nav': '0 1px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'apple': '12px',
        'apple-lg': '18px',
      },
      transitionDuration: {
        'apple': '200ms',
      },
    },
  },
  plugins: [],
}
