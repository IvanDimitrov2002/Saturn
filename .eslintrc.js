// .eslintrc.js
// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',

        // Prettier plugin and recommended rules
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    rules: {
        // Include .prettierrc.js rules
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
    },
};