import sass from 'sass'
import less from 'less'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cpacker from './plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cpacker({ sass, less, scopeName: 'testname' })
  ],
})
