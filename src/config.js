export default {
  extends: 'pidev',
  parser: 'babel-eslint',
  globals: {
    process: true,
    module: true
  },
  plugins: [
    'ava',
    'graphql',
    'jsdoc'
  ]
};
