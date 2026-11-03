import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/style-testing-102/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        carbon: resolve(root, 'carbon/index.html'),
        mui: resolve(root, 'mui/index.html'),
        ant: resolve(root, 'ant/index.html')
      }
    }
  }
});