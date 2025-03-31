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
        files: [''],
        languageOptions: { globals: Object.fromEntries(globals.map(e => [e, true])) },
        rules: {},
    },
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
