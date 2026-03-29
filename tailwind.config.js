/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0e1e41',
        secondary: '#7C3AED',
        background: '#F9FAFB',
        card: '#FFFFFF',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}