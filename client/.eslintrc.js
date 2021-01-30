module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['prettier'],
  plugins: ['prettier', 'react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
    eqeqeq: ['error', 'always'],
    'no-multi-spaces': 'warn',
    'require-await': 'error',
    'no-var': 'error',
    'prefer-const': 'warn',

    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': 'error',

    'prettier/prettier': 'error',
  },
}
