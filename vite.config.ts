import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Shims process.env.API_KEY for the Gemini Service so it works with Vite
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});