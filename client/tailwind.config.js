/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', 
  theme: {
  	extend: {
  	colors: {
  'light-bg': '#F8FAFC',
  'dark-bg': '#0F172A',

  'light-surface': '#FFFFFF',
  'dark-surface': '#1E293B',

  'light-text': '#1E3A8A', // Primary blue from light mode
  'dark-text': '#F1F5F9', // Light off-white for dark mode primary text

  'light-secondary': '#6B7280', // Gray for labels in light mode
  'dark-secondary': '#94A3B8', // Lighter gray for labels in dark mode

  'light-accent': '#14B8A6', // Button teal in light mode
  'dark-accent': '#06B6D4', // Button teal in dark mode (slightly brighter)

  'light-success': '#22C55E', // Logo green
  'dark-success': '#22C55E', // Logo green (retained)

  'light-border': '#ADD8E6', // Input field border in light mode
  'dark-border': '#475569', // Input field border in dark mode

  'light-input-text': '#1E3A8A', // Input text color in light mode
  'dark-input-text': '#F1F5F9', // Input text color in

  'light-error': '#DC2626', // Assuming this is an error color, keeping it for now
  'dark-error': '#FF6B6B', // Assuming this is an error color, keeping it for now

  'light-hover': '#2CAAA6', // Assuming this is a hover color, keeping it for now
  'dark-hover': '#258E8A', // Assuming this is a hover color, keeping it for now

  'light-disabled': '#E5E7EB', // Assuming this is a disabled color, keeping it for now
  'dark-disabled': '#5C6770', // Assuming this is a disabled color, keeping it for now

  'light-logo-blue': '#06B6D4', // Logo teal
  'dark-logo-blue': '#06B6D4', // Logo teal (retained)

  'light-bg-shape1': '#F8FAFC', 
  'dark-bg-shape1': '#0F172A', 

  'light-bg-highlight': '#5b76c2', // Light mode background highlight
  'dark-bg-highlight': '#1E3A8A', // Dark mode background highlight

  'light-bg-shape2': '#042361',
  'dark-bg-shape2': '#031230',
}


  	},
  	plugins: []
  },
    plugins: [require("tailwindcss-animate")]
}