module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  extends: ['@react-native-community', 'eslint-config-prettier', 'prettier'],
  plugins: ['prettier', '@typescript-eslint', 'import'],

  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-shadow': 'off',
    'max-len': ['error', { code: 75 }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': ['warn', { allow: ['error', 'info'] }],
    'import/no-cycle': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@kroon-test/**',
            group: 'external',
            position: 'after',
          }
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ["internal"],
      },
    ],
  },
};
