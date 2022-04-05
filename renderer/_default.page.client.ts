import { navigate, useClientRouter } from "vite-plugin-ssr/client/router"
import type { PageContext } from "~/models/PageContext"
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client/router"
import { createApp } from "./app"
import { getPageTitle } from "~/utils/getPageTitle"


let context: ReturnType<typeof createApp>
const { hydrationPromise } = useClientRouter({
  render(pageContext: PageContextBuiltInClient & PageContext) {
    const { redirectTo } = pageContext
    if (redirectTo) {
      navigate(redirectTo)
      return
    }

    if (!context) {
      context = createApp(pageContext)
      context.pinia.state.value = pageContext.initialState
      context.app.mount("#app")
    }
    else {
      context.app.changePage(pageContext)
    }
    document.title = getPageTitle(pageContext)
  },
  ensureHydration: true,
  prefetchLinks: true,
  onTransitionStart,
  onTransitionEnd
})

hydrationPromise.then(() => {
  console.log("Hydration finished; page is now interactive.")
})

function onTransitionStart() {
  document.querySelector(".content")?.classList.add("page-transition-before")
}

function onTransitionEnd() {
  document.querySelector(".content")?.classList.remove("page-transition-before")
  document.querySelector(".content")?.classList.add("page-transition-after")
}
