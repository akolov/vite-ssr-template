export type Component = any

export type PageContext = {
  Page: Component
  initialState: any
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
