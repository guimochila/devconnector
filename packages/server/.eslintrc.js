module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'consistent-return': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
