/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        glow: 'glow 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)' },  // Soft white glow
          '50%': { boxShadow: '0 0 20px 4px rgba(255, 255, 255, 1)' }          // Brighter pulse
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    // require('tailwindcss-filters'),
    // require('tailwindcss-clip-path'),
  ],

}