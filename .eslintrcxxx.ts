module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'html','javascript'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'array-bracket-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'html/quotes': ['error', 'single'],
    'html/html-extensions': ['error', '.html'],

    'html/indent': ['error', 2, { attribute: 1, baseIndent: 1, closeBracket: 0 }],
  },
};
/* module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  //plugins: ['@typescript-eslint'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': 'error',
    'template-curly-spacing': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'array-bracket-spacing': ['error', 'always'], // espacios en blanco entre corchetes
    'space-in-parens': ['error', 'always'], // espacios en blanco entre paréntesis
    "key-spacing": ["error", { "beforeColon": true }],
  },
};

 */
