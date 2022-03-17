import { createSSRApp, markRaw, reactive } from "@vue/runtime-dom"
import { defineComponent, h } from "@vue/runtime-core"
import { useI18n } from "vue-i18n"

import { setPageContext } from "~/utils/usePageContext"
import { i18n, en } from "~/utils/i18n"
import { globals } from "~/utils/env"

import { createPinia } from "pinia"
import devalue from "@nuxt/devalue"

import type { Component, PageContext } from "~/models/PageContext"

import axios from "axios"
import PageShell from "~/components/PageShell.vue"


axios.defaults.headers.common["X-WebClient"] = `${globals.appName}/${globals.appVersion} (build:${globals.appVersionBuild})`


export { createApp }

function createApp(pageContext: PageContext) {
  const { Page } = pageContext

  let rootComponent: Component
  const PageWithWrapper = defineComponent({
    created() {
      rootComponent = this
    },
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {}),
    }),
    setup() {
      return useI18n({
        locale: "en",
        inheritLocale: false,
        messages: {
          en: en
        }
      })
    },
    render() {
      return h(
        PageShell,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })

  const pinia = createPinia()
  const app = createSSRApp(PageWithWrapper)
  app.use(pinia)
  app.use(i18n)

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext)
      rootComponent.Page = markRaw(pageContext.Page)
      rootComponent.pageProps = markRaw(pageContext.pageProps || {})
    },
  })

  devalue(pinia.state.value)

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)
  setPageContext(app, pageContext)

  return { app, pinia }
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj, ObjAddendum>(obj: Obj, objAddendum: ObjAddendum): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}
