import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const integrations = [
    react(),
];

const astro = defineConfig({
    integrations,
});

export default astro;
