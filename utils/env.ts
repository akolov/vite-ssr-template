export const isBrowser = typeof window !== "undefined"
export const isProduction = process.env.NODE_ENV === "production"
export const isDarkMode = typeof window !== "undefined" && typeof window.matchMedia !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches : false
export const language = typeof window !== "undefined" ? window.navigator.language : import.meta.env.VITE_LOCALE as string


type GlobalConstants = {
  appName: string
  appVersion: string
  appVersionBuild: string,
  baseURL: string
}

export const globals: GlobalConstants = {
  appName: import.meta.env.VITE_APP_NAME as string,
  appVersion: import.meta.env.VITE_APP_VERSION as string,
  appVersionBuild: import.meta.env.VITE_APP_VERSION_BUILD as string,
  baseURL: import.meta.env.VITE_BASE_URL as string
}
