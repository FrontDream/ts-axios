import { AxiosRequestConfig, AxiosResponse, Method, ResolvedFn, RejectFn } from '../types'
import InterceptorManager from './InterceptorManager';
import dispatchRequest from './dispatchRequest';

interface Interceptor{
  request: InterceptorManager<AxiosRequestConfig>,
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T>{
  resolved: ResolvedFn<T> | ((config:AxiosRequestConfig )=>AxiosResponse),
  rejected?: RejectFn
}

export  default  class Axios {
  interceptors: Interceptor
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(url: any,config?: any){
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }
    const promiseChain: Array<PromiseChain<any>> = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach((interceptor)=>{
      promiseChain.unshift(interceptor)
    })
    this.interceptors.response.forEach((interceptor)=>{
      promiseChain.push(interceptor)
    })
    let promise = Promise.resolve(config)

    while (promiseChain.length) {
      const { resolved, rejected } = promiseChain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
  get(url: string, config?: AxiosRequestConfig){
    return this._dispatchRequestWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig){
    return this._dispatchRequestWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig){
    return this._dispatchRequestWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig){
    return this._dispatchRequestWithoutData('options',url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig){
    return this._dispatchRequestEWithData('post',url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig){
    return this._dispatchRequestEWithData('put',url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig){
    return this._dispatchRequestEWithData('patch',url, data, config)
  }
  _dispatchRequestWithoutData(method: Method, url:string, config?:AxiosRequestConfig){
    return this.request(Object.assign(config||{}, { url, method }))
  }
  _dispatchRequestEWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig){
    return this.request(Object.assign(config||{}, { url, method, data}))
  }
}
