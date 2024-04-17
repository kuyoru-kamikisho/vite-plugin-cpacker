import {resolve} from "path";
import {defineConfig} from "vite";

export default defineConfig({
    build: {
        lib: {
            name: 'plugin',
            entry: resolve(__dirname, 'plugin/index.ts'),
            fileName: 'index',
            formats: ['es', 'cjs']
        }
    }
})