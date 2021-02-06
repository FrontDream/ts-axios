
export type Method = 'get' | 'GET'| 'post' |'POST'|'delete'|'DELETE'|'patch'|'PATCH' |'put'|'PUT'

export interface AxiosRequestConfig{
  method?: Method,
  params?: any,
  data?: any,
  url: string,
}
