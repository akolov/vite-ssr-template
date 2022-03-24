import { UserConfig } from "vite"
import eslintPlugin from "vite-plugin-eslint"
import path from "path"
import { ssr } from "vite-plugin-ssr/plugin"
import viteCompression from "vite-plugin-compression"
import vue from "@vitejs/plugin-vue"
import { vueI18n } from "@intlify/vite-plugin-vue-i18n"


const config: UserConfig = {
  plugins: [
    eslintPlugin(),
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./locales/**")
    }),
    ssr(),
    viteCompression({ verbose: true })
  ],
  resolve: {
    alias: {
      "~": __dirname
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
}

export default config
