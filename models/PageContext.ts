import { StateTree } from "pinia"

export type Component = object & { Page?: Component, pageProps?: Record<string, unknown> }

export type PageContext = {
  Page: Component
  initialState: Record<string, StateTree>
  appHtml: string
  pageProps?: Record<string, unknown>
  pageExports: {
    documentProps?: {
      title?: string
    }
  }
  documentProps?: {
    title: string
    description?: string
  }
}
