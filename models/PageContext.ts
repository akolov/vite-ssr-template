import { StateTree } from "pinia"

export type Component = object

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
