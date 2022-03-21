import { StateTree } from "pinia"

export type Component = object & { Page?: Component, pageProps?: Record<string, unknown> }

export type PageContext = {

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
  pageProps?: Record<string, unknown>

}
