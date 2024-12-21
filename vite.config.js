import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  server: {
    fs: {
      allow: [
        resolve(__dirname, 'src'),
        resolve(__dirname, 'public')
      ]
    },
    open: true,
    host: true,
    port: 5173
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     // target: 'https://d.topup.cm',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  // Ajoutez cette section pour la production
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})

// import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
//
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '@public': fileURLToPath(new URL('./public', import.meta.url))
//     }
//   },
//   server: {
//     fs: {
//       allow: [
//         resolve(__dirname, 'src'),
//         resolve(__dirname, 'public')
//       ]
//     },
//       open: true,
//       host: true,
//       port: 5000,
//   }
// })