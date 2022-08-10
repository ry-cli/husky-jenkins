module.exports = {
    extends: 'react-app',
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-useless-constructor': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
}
