export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'patch'
  | 'PATCH'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  method?: Method
  params?: any
  data?: any
  url?: string
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: AxiosCancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AuthConfig
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  baseURL?: string
  [key: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosResponsePromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  request?: any
  response?: any
  code?: number | null
  isAxiosError?: boolean
}

// 类类型
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  getUri(config?: AxiosRequestConfig): string
}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

// 混合类型
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  CancelToken: AxiosCancelStatic
  Cancel: CancelStatic
  isCancel: (val: any) => boolean
  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
  Axios: AxiosClassStatic
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (errors: any): any
}

export interface InterceptorManager<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectFn): number
  eject(id: number): void
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosCancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface AxiosCancelExecutor {
  (executor: AxiosCancer): void
}

export interface AxiosCancer {
  (reason?: string): void
}

export interface CancelSource {
  token: AxiosCancelToken
  cancel: AxiosCancer
}

export interface AxiosCancelStatic {
  new (executor: AxiosCancelExecutor): AxiosCancelToken
  source(): CancelSource
}

export interface Cancel {
  reason?: string
}

export interface CancelStatic {
  new (reason?: string): Cancel
}

export interface AuthConfig {
  username: string
  password: string
}
