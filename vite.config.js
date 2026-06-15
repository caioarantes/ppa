import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages project page (caioarantes.github.io/ppa/), so base is '/ppa/'.
// History mode + 404.html redirect keep clean URLs working on Pages.
// If a custom domain is configured later, change base to '/'.
export default defineConfig({
  base: '/ppa/',
  plugins: [vue()],
})
