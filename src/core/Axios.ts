import { AxiosRequestConfig, Method } from '../types';
import dispatchRequest from './dispatchRequest';

export  default  class Axios {
  request(url: any,config?: any){
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }
    return dispatchRequest(config)
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
