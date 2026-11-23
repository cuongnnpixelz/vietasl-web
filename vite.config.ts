import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { createHybridApi } from './server/hybridApi';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vietasl-hybrid-api',
        configureServer(server) {
          server.middlewares.use(createHybridApi({ env: { ...env, ...process.env } }));
        },
        configurePreviewServer(server) {
          server.middlewares.use(createHybridApi({ env: { ...env, ...process.env } }));
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 3000,
      host: '127.0.0.1'
    }
  };
});
