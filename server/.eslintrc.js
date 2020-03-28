module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'script',
    },
    extends: ['prettier'],
    plugins: ['prettier', 'import'],
    rules: {
        eqeqeq: ['error', 'always'],
        'no-multi-spaces': 'warn',
        'require-await': 'error',
        'no-var': 'error',
        'prefer-const': 'warn',

        'no-unused-vars': 'error',
        'prettier/prettier': 'error',

        'import/extensions': ['error', 'ignorePackages'],
    },
}
