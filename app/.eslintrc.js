module.exports = {
    extends: ['prettier'],
    plugins: ['prettier', 'react'],
    parser: 'babel-eslint',
    rules: {
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
