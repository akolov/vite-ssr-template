import type { PageContext } from "~/models/PageContext"
import type { PageContextBuiltIn } from "vite-plugin-ssr"

import { PatchedHttpsProxyAgent } from "~/utils/httpsProxyAgent"
import axios from "axios"
import { createApp } from "./app"
import { escapeInject } from "vite-plugin-ssr"
import { getPageTitle } from "~/utils/getPageTitle"
import { globals } from "~/utils/env"
import { i18n } from "~/utils/i18n"
import { renderToNodeStream } from "@vue/server-renderer"

export { render, onBeforeRender, passToClient }


const passToClient = ["documentProps", "initialState", "pageProps", "redirectTo", "routeParams"]

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const stream = pageContext.appHtml
  const { documentProps } = pageContext
  const title = getPageTitle(pageContext)
  const desc = (documentProps && documentProps.description) || i18n.global.t("seo.description")

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
  if (globals.proxyHost && globals.proxyPort) {
    axios.defaults.httpsAgent = new PatchedHttpsProxyAgent({
      host: globals.proxyHost,
      port: globals.proxyPort,
      rejectUnauthorized: false
    })
  }

  const prerenderPageContext = await (pageContext as unknown).runOnBeforeRenderPageHook(pageContext)
  const extendedPageContext = { ...pageContext, ...prerenderPageContext.pageContext }
  const { app, pinia } = createApp(extendedPageContext)
  const appHtml = renderToNodeStream(app)
  const initialState = pinia.state.value

  return {
    pageContext: {
      ...prerenderPageContext.pageContext,
      initialState,
      appHtml
    }
  }
}
