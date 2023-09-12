import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Unfonts from 'unplugin-fonts/vite'

export default defineConfig({
  plugins: [
    vue(),
    Unfonts({
      google: {
        families: [
          'Monomaniac One' // ここに導入したいフォント名を入れる
        ],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"), 
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/_variables.scss";`,
      },
    },
  }
})
