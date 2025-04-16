import { defineConfig } from 'astro/config';
// Import /static for a static site
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
});