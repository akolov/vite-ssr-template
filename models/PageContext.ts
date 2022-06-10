import type { PageContextBuiltIn } from "vite-plugin-ssr"
import { StateTree } from "pinia"

export type Component = object & { Page?: Component, pageProps?: Record<string, unknown> }

export type PageContext = PageContextBuiltIn & {

  documentProps?: {
    title: string
    description?: string
  }

  pageExports: {
    documentProps?: {
      title?: string
    }
  }

  Page: Component
  appHtml: string
  initialState: Record<string, StateTree>
  isPrerendering?: boolean
  pageProps?: Record<string, unknown>
  redirectTo?: string

}
