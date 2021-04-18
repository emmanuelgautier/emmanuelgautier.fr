module.exports = {
  plugins: process.env.CSS_ENV === 'build'
    ? [
      require('tailwindcss'),
      require('@fullhuman/postcss-purgecss')({
        // Specify the paths to all of the template files in your project
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}'
        ],

        // Include any special characters you're using in this regular expression
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }),
      require('postcss-preset-env'),
      require('cssnano')({
        preset: 'default'
      })
    ]
    : {
      '@tailwindcss/jit': {},
      autoprefixer: {}
    }
}
