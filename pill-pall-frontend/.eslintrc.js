module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    curly: ['error', 'all'],
    'no-else-return': 'error',
  },
};
