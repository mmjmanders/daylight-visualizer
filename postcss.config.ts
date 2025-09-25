export default {
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
