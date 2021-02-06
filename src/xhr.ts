import  { AxiosRequestConfig } from './types'

export function xhr(config: AxiosRequestConfig):void{
  const { method = 'get', url, data = null } = config
  console.log('ddddd==============')
  const request = new XMLHttpRequest()
  console.log(config)
  request.open(method.toUpperCase(),url, true)
  request.send(data)
}
