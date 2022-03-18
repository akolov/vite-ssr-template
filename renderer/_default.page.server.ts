import type { PageContext } from "~/models/PageContext"
import type { PageContextBuiltIn } from "vite-plugin-ssr"

import { createApp } from "./app"
import { escapeInject } from "vite-plugin-ssr"
import { getPageTitle } from "~/utils/getPageTitle"
import { globals } from "~/utils/env"
import { i18n } from "~/utils/i18n"
import { renderToNodeStream } from "@vue/server-renderer"

export { passToClient }
export { render, onBeforeRender }


const passToClient = ["pageProps", "documentProps", "initialState"]

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const stream = pageContext.appHtml

  const { documentProps } = pageContext
  const title = getPageTitle(pageContext)
  const desc = (documentProps && documentProps.description) || i18n.global.t("seo.description");

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        <link rel="mask-icon" href="/favicon.svg" color="#ffffff"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0"/>
        <meta name="description" content="${desc}"/>
        <meta property="og:image" content="${globals.baseURL}/opengraph.png"/>
        <meta property="og:description" content="${desc}"/>
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`
}

async function onBeforeRender(pageContext: PageContextBuiltIn & PageContext) {
  const { app, pinia } = createApp(pageContext)
  const appHtml = renderToNodeStream(app)
  const initialState = pinia.state.value
  return {
    pageContext: {
      initialState,
      appHtml,
    }
  }
}
