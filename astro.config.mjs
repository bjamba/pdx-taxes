import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.github.io',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
