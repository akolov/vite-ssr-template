// Hook `usePageContext()` to make `pageContext` available from any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { inject } from "@vue/runtime-core"
import type { App } from "@vue/runtime-core"
import { PageContext } from "~/models/PageContext"

export { usePageContext }
export { setPageContext }

const key = Symbol()

function usePageContext() {
  const pageContext = inject(key)
  return pageContext
}

function setPageContext(app: App, pageContext: PageContext) {
  app.provide(key, pageContext)
}
