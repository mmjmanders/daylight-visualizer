/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'oklab-function': {
          preserve: true,
        },
        'nesting-rules': {},
      },
    },
  },
};

module.exports = config;
