import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const integrations = [
    react(),
];

const astro = defineConfig({
    integrations,
    output: 'static',
    site: 'https://k-mapbox.netlify.app',
});

export default astro;
