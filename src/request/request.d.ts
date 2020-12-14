import 'axios'
declare module 'axios' {
  interface AxiosRequestConfig {
    isServer?: boolean
  }
}
