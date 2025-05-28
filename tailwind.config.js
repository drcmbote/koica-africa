export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', '"Malgun Gothic"', 'sans-serif'],
      },
      colors: {
        'africa1': '#1976D2',
        'africa2': '#D81B60',
        'executed': '#4CAF50',
        'remaining': '#B0BEC5',
        'progress': '#0288D1',
        'search': '#388E3C',
        'upload': '#FBC02D',
        'logout': '#D32F2F',
        'error': '#D32F2F',
      },
    },
  },
  plugins: [],
};