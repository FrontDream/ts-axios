
export type Method = 'get' | 'GET'| 'post' |'POST'|'delete'|'DELETE'|'patch'|'PATCH' |'put'|'PUT'

export interface AxiosRequestConfig{
  method?: Method,
  params?: any,
  data?: any,
  url: string,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
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
