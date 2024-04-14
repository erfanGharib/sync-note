/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/src/**/**/*.{svg,html,js,tsx,ts}',
    './client/src/**/*.{svg,html,js,tsx,ts}',
    './client/src/components/**/*.{svg,html,js,jsx,tsx,ts}',
    './client/src/components/**/**/*.{svg,html,js,jsx,tsx,ts}',
    './client/src/assets/**/*.{svg,html,js,jsx,tsx,ts}',
  ],
  theme: {},
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.f-center': {
          '@apply flex items-center justify-center': {},
        },
        '.f-start-center': {
          '@apply flex items-start justify-center': {},
        },
        '.f-start': {
          '@apply flex items-start justify-start': {},
        },
        '.f-center-start': {
          '@apply flex items-center justify-start': {},
        },
        '.f-end-start': {
          '@apply flex items-end justify-start': {},
        },
        '.f-start-end': {
          '@apply flex items-start justify-end': {},
        },
        '.f-center-end': {
          '@apply flex items-center justify-end': {},
        },
        '.f-center-between': {
          '@apply flex items-center justify-between': {},
        },
        '.f-start-between': {
          '@apply flex items-start justify-between': {},
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.link': {
          '@apply cursor-pointer opacity-60 relative hover:opacity-100 transition-opacity py-3 f-center gap-x-2': {},
          color: '#9b9ec0'
        }
      })
    }
  ]
}
