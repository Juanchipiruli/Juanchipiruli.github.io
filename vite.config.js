import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Asegúrate de incluir el plugin de React
  server: {
    allowedHosts: [
      '.ngrok-free.app', // Permite cualquier subdominio de ngrok
      'localhost',
    ],
  },
});