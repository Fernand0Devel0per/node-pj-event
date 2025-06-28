module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
}
