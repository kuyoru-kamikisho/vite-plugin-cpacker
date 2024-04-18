import * as sass from 'sass'
import less from 'less'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import cpacker from './plugin'

export default defineConfig({
    plugins: [
        vue(),
        cpacker({sass, less, scopeName: 'testname'})
    ]
})
