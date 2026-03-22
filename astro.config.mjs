import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ottawaweekly.ca',
  integrations: [
    tailwind(),
    // sitemap: re-enable after upgrading @astrojs/sitemap past 3.7.x bug
  ],
});
