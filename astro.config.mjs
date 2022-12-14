import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://kanae.dev/',
  markdown: {
    remarkPlugins: [remarkToc],
    extendDefaultPlugins: true
  },
  integrations: [tailwind(), react()]
});