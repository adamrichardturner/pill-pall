module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        // Prettier integration
        'prettier/prettier': 'error',

        // TypeScript specific rules - basic ones only
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // General JavaScript/Node.js rules
        'prefer-const': 'error',
        'no-var': 'error',
        'no-console': 'off',
        'no-debugger': 'warn',
        'no-duplicate-imports': 'error',

        // Security rules
        'no-eval': 'error',
        'no-implied-eval': 'error',
    },
    env: {
        node: true,
        es6: true,
    },
    ignorePatterns: ['dist/', 'node_modules/', '*.js'],
}; 