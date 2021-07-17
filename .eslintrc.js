module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-shadow': 0,
    camelcase: 0,
    indent: [2, 2, { SwitchCase: 1 }],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
  },
};
