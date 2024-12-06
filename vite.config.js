import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  // build: {
  //   target: 'es2015'
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Alias optionnel pour public
      '@public': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  // Support pour les imports depuis public
  server: {
    fs: {
      allow: [
        resolve(__dirname, 'src'),
        resolve(__dirname, 'public')
      ]
    }
  }
})


// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'
//
// export default defineConfig({
//   plugins: [vue()],
//   base: '/',
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     manifest: true,
//     rollupOptions: {
//       input: path.resolve(__dirname, 'index.html'),
//     },
//   },
// })

// import { fileURLToPath, URL } from 'node:url'
//
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
//
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueDevTools(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     },
//   },
// })