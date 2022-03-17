import { createI18n } from "vue-i18n"
import en from "~/locales/en.json5"

export { en }

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: en
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency", currency: "USD", notation: "standard", currencyDisplay: "code"
      },
      decimal: {
        style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2
      },
      percent: {
        style: "percent", useGrouping: false
      }
    }
  }
})
