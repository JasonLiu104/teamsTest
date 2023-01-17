import {
  fileURLToPath, URL 
} from 'url'
import legacy from '@vitejs/plugin-legacy'

import { 
  defineConfig, loadEnv 
} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({
  mode 
}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    build: {
      target: [ 'es2015' ],
      outDir: resolve('dist', env.OUTPUT_DIR),
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
        ]
      }
    },
    base: '/',
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@use "@/assets/styles/abstract/_index.scss" as *;'
        }
      }
    },
    ssgOptions: {
      dirStyle: 'nested',
      mock: true
    },
    plugins: [ 
      vue(),
      legacy({
        targets: [
          'defaults',
          'not dead'
        ],
        modernPolyfills: true
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 53000,
      host: true,
      https: true,
      // hmr: {
      //   protocol: 'ws',
      //   host: 'localhost'
      // },
      // proxy: {
      //   '/api': {
      //     target: 'https://api.events.104-dev.com.tw/v1/form-messages/db1a4540-45e6-11ed-af08-f31c5a1e25ee',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      //   headers: 'https://api.events.104-dev.com.tw/'
      // }
    }
  }
})