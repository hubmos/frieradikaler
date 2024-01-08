import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://hubmos.github.io',
  base: '/frieradikaler',
  integrations: [react(), tailwind()]
});
