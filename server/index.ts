import * as process from "process"
import * as vite from "vite"
import express, { static as expressStatic } from "express"
import compression from "compression"
import { fileURLToPath } from "url"
import path from "path"
import { createPageRenderer } from "vite-plugin-ssr"


const isProduction = process.env.NODE_ENV === "production"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  let viteDevServer
  if (isProduction) {
    app.use(expressStatic(`${root}/dist/client`))
  }
  else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: "ssr" }
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
      redirectTo: undefined
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse, redirectTo } = pageContext

    if (redirectTo) {
      res.redirect(307, redirectTo)
    }
    else if (!httpResponse) {
      return next()
    }
    else {
      const stream = await httpResponse.getNodeStream()
      const { statusCode, contentType } = httpResponse
      res.status(statusCode).type(contentType)
      stream.pipe(res)
    }
  })

  const port = process.env.PORT || 3000

  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
