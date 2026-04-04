import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    assetsInlineLimit: 4096,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
