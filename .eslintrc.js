module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'react/function-component-definition': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'no-use-before-define': 0,
    'react/no-unstable-nested-components': 0,
    'no-param-reassign': 0,
    camelcase: 0,
  },
};
