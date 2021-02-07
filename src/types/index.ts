
export type Method = 'get' | 'GET'| 'post' |'POST'|'delete'|'DELETE'|'patch'|'PATCH' |'put'|'PUT'

export interface AxiosRequestConfig{
  method?: Method,
  params?: any,
  data?: any,
  url?: string,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number,
}

export interface AxiosResponse{
  data: any,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  request: any,
}

export interface AxiosResponsePromise extends Promise<AxiosResponse>{}

export interface AxiosError extends  Error{
  config: AxiosRequestConfig,
  request?: any,
  response?: any,
  code?:number | null,
  isAxiosError?: boolean
}

// 类类型
export interface Axios {
  request(config: AxiosRequestConfig):AxiosResponsePromise,
  get(url: string, config?:AxiosRequestConfig): AxiosResponsePromise,
  delete(url: string, config?:AxiosRequestConfig): AxiosResponsePromise,
  head(url: string, config?:AxiosRequestConfig): AxiosResponsePromise,
  option(url: string, config?:AxiosRequestConfig): AxiosResponsePromise,
  post(url: string,data?:any, config?:AxiosRequestConfig): AxiosResponsePromise,
  put(url: string,data?:any, config?:AxiosRequestConfig): AxiosResponsePromise,
  put(url: string,data?:any, config?:AxiosRequestConfig): AxiosResponsePromise,
}

// 混合类型
export interface  AxiosInstance extends Axios{
  (config: AxiosRequestConfig): AxiosResponsePromise
}
