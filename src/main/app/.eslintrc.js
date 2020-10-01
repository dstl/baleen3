module.exports = {
  env: {
    browser: true,
    es6: true,
    node: false,
    jest: true,
  },
  extends: [
    // non-ts recommended rules
    'eslint:recommended',
    // remove non-ts rules covered by typescript-eslint
    'plugin:@typescript-eslint/eslint-recommended',
    // ts recommended rules
    // can be slow
    'plugin:@typescript-eslint/recommended',
    // ts recommended rules that require tsconfig.json to be specified in parserOptions.project
    // can be slow
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // remove rules covered by prettier
    'prettier/@typescript-eslint',
    // create-react-app defaults
    'react-app',
    'plugin:security/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'security'],
  ignorePatterns: ['*.test.ts*', 'test.tsx'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    // Enable additional rules
    '@typescript-eslint/naming-convention': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      { ignoreRhs: true },
    ],
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
        allowNullable: false,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      { ignoreRhs: true },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/require-await': 'error',
    'react/jsx-pascal-case': [
      'warn',
      {
        ignore: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'd1',
          'd2',
          'd3',
          'd4',
          'd5',
          'd6',
        ],
      },
    ],
  },
}
