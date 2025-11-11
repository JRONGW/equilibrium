import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  root: 'client',
  publicDir: 'public',
  build: {
    outDir: '../dist',                 // stays inside the project, relative to root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home:     'index.html',
        timeline: 'timeline.html',
        about:    'about.html',
        country:  'country.html',
      }
    }
  },
  server: {
    port: 8080, proxy: {
      '/api':
      { //target: 'http://10.129.111.24:3000',//
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
});