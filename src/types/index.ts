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
}

// 混合类型
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance
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
