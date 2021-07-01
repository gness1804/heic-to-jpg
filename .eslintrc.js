module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'error',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/extensions': ['.mjs', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js'],
      },
    },
  },
};
