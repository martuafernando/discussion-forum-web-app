module.exports = {
  root: true,
  env: { browser: true, es2020: true, 'cypress/globals': true },
  extends: [
    "eslint:recommended",
    "google",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'cypress'],
  rules: {
    "require-jsdoc" : 0,
    "max-len" : 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
