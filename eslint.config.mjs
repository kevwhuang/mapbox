import { eslint } from '@aephonics/config';

const ignores = [
    '.astro/**',
    'dist/**',
];

const globals = [
    '',
];

const overrides = [
    {
        files: ['**/*.tsx'],
        languageOptions: { globals: Object.fromEntries(globals.map(e => [e, true])) },
        rules: { 'hooks/exhaustive-deps': 0 },
    },
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
