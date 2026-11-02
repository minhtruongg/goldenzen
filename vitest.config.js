import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname) } },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    env: {
      ADMIN_PASSWORD: 'correct-horse',
      ADMIN_SESSION_SECRET: 'test-secret',
      TELEGRAM_TOKEN: 'test-token',
      TELEGRAM_CHAT_ID: '111',
      TELEGRAM_CHAT_ID_2: '222',
    },
  },
});
