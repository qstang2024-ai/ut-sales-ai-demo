import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 5174, allowedHosts: ['.trycloudflare.com'] },
  build: { outDir: 'dist', assetsDir: 'assets' },
});
