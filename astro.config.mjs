import { defineConfig } from 'astro/config';

// GitHub Pages project deployment: served at https://bjamba.github.io/pdx-taxes/
export default defineConfig({
  site: 'https://bjamba.github.io',
  base: '/pdx-taxes',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
