module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'prettier/prettier': 'error',
  },
};
