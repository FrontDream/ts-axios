import  { AxiosRequestConfig, AxiosResponsePromise, AxiosResponse } from './types';
import { parseHeaders } from './helpers/headers';

export function xhr(config: AxiosRequestConfig):AxiosResponsePromise{
  return new Promise((resolve, reject)=>{
    const { method = 'get', url, data = null, headers, responseType } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(),url, true)
    if(responseType){
      request.responseType = responseType
    }
    request.onreadystatechange = function(){
      if(request.readyState!==4){
        return
      }
      const responseData = responseType==='text'? request.responseText: request.response
      const responseHeaders =parseHeaders(request.getAllResponseHeaders())
      const response: AxiosResponse = {
        config,
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        request,
        headers: responseHeaders
      }
      resolve(response)
    }
    Object.keys(headers).forEach(head=>{
      if(data===null&&head.toLowerCase()==='content-type'){
        delete headers[head]
      }else {
        request.setRequestHeader(head, headers[head])
      }
    })
    request.send(data)
  })
}
