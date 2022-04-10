export const isBrowser = typeof window !== "undefined"
export const isProduction = process.env.NODE_ENV === "production"
export const getIsDarkMode = () => typeof window !== "undefined" && typeof window.matchMedia !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches : false
export const getLanguage = () => typeof window !== "undefined" ? window.navigator.language : import.meta.env.VITE_LOCALE as string


type GlobalConstants = {
  appName: string
  appVersion: string
  appVersionBuild: string,
  baseURL: string,
  proxyHost: string | null
  proxyPort: string | null
}

export const globals: GlobalConstants = {
  appName: import.meta.env.VITE_APP_NAME as string,
  appVersion: import.meta.env.VITE_APP_VERSION as string,
  appVersionBuild: import.meta.env.VITE_APP_VERSION_BUILD as string,
  baseURL: import.meta.env.VITE_BASE_URL as string,
  proxyPort: import.meta.env.VITE_PROXY_PORT as string ?? null,
  proxyHost: import.meta.env.VITE_PROXY_HOST as string ?? null
}
