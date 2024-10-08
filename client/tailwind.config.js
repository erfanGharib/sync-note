/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.vue',
    './src/components/*.vue',
    './src/components/**/*.vue',
    './src/assets/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        'black-900': '#111',
        'black-800': '#222',
      }
    }
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.click-effect': {
          '@apply active:brightness-[.6] transition-all': {},
        },
        '.err': {
          '@apply text-red-400 text-sm capitalize': {}
        },
        '.input, .textarea': {
          '@apply rounded-lg p-4 outline-none text-orange-100 placeholder:text-orange-100 placeholder:text-opacity-50': {},
        },
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
