import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),  
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'), // ДОДАВ!
    }
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        // ДОДАВ @use для ВСІХ трьох файлів
        additionalData: `
          @use '@styles/colors' as *;
          @use '@styles/variables' as *;
          @use '@styles/mixins' as *;
        `
      }
    }
  }
});