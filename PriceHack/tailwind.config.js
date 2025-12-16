/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'status-cheapest': '#10B981',
        'status-higher': '#F59E0B',
        'status-same': '#6B7280',
        'status-unavailable': '#D1D5DB',
      },
    },
  },
  plugins: [],
}
