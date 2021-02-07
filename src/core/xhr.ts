import  { AxiosRequestConfig, AxiosResponsePromise, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error'

export function xhr(config: AxiosRequestConfig):AxiosResponsePromise{
  return new Promise((resolve, reject)=>{
    const { method = 'get', url, data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(),url!, true)
    if(responseType){
      request.responseType = responseType
    }
    if(timeout){
      request.timeout = timeout
    }
    request.onreadystatechange = function(){
      if(request.readyState!==4){
        return
      }
      if(request.status === 0){
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
      console.log('response:', response)
      handleResponse(response)
    }
    request.onerror = function handleError(){
      reject(createError('Network Error', config,null, request))
    }
    request.ontimeout = function handleTimeOut(){
      reject(createError(`timeout of ${ timeout } exceeds`, config, 'ECONNABORTED', request))
    }
    Object.keys(headers).forEach(head=>{
      if(data===null&&head.toLowerCase()==='content-type'){
        delete headers[head]
      }else {
        request.setRequestHeader(head, headers[head])
      }
    })
    request.send(data)
    function handleResponse(response: AxiosResponse){
      if(response.status>=200&&response.status<300){
        resolve(response)
      }else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}
