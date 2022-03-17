import vue from "@vitejs/plugin-vue"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import ssr from "vite-plugin-ssr/plugin"
import path from "path"

import { UserConfig } from "vite"

const config: UserConfig = {
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./locales/**")
    }),
    ssr()
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
