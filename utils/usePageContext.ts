// Hook `usePageContext()` to make `pageContext` available from any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import type { App } from "@vue/runtime-core"
import { PageContext } from "~/models/PageContext"
import { inject } from "vue"

export { usePageContext }
export { setPageContext }


const key = Symbol()

function usePageContext<T extends PageContext>(): T {
  const pageContext = inject(key)
  return pageContext as T
}

function setPageContext(app: App, pageContext: PageContext) {
  app.provide(key, pageContext)
}
