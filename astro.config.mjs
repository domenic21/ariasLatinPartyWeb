// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Astro main config.
// - site: your real domain. ⚠️ CHANGE THIS to your live URL before deploying.
//         It's used to build absolute URLs for the sitemap, canonical tags,
//         and social-share (Open Graph) images — all of which SEO needs.
// - react(): lets us drop React/Three.js components into .astro files.
// - sitemap(): auto-generates /sitemap-index.xml so search engines + AI
//         crawlers can discover every page.
// - tailwindcss(): Tailwind v4 as a Vite plugin.
export default defineConfig({
  site: 'https://www.ariaslatinparty.com',
  // Two languages: English at "/" and Spanish at "/es/".
  // Astro.currentLocale (used in components) is derived from the URL.
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
