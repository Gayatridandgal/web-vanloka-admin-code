import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['node_modules/**', 'dist/**'] },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        rules: {
            'no-var': 'error',
            'no-console': 'warn',
            'prefer-const': 'error',
            eqeqeq: ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    }
);
