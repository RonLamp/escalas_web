const { resolve } = require("path")

module.exports = {
  root: true,
  settings:{
      "import/resolver": {
         typescript: {},
      },
   },
   extends: [
      '@react-native-community',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions:{
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
   },
   rules:{
      'max-len': ['error', { 'codes': 80 }],
      'react/prop-types': 'off',
      'react/in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
   },
}
