import { AxiosRequestConfig, AxiosResponse, Method, ResolvedFn, RejectFn } from '../types'
import InterceptorManager from './InterceptorManager'
import dispatchRequest, { transformUrl } from './dispatchRequest'
import mergeConfig from './mergeConfig'

interface Interceptor {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosResponse)
  rejected?: RejectFn
}

export default class Axios {
  interceptors: Interceptor
  defaults: AxiosRequestConfig
  constructor(config: AxiosRequestConfig) {
    this.defaults = config
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  // 因为有可能是request(url, config)，或者是request(config)
  request(url: any, config?: any) {
    // 第一种使用情况
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 第二种使用情况
      config = url
    }
    config = mergeConfig(this.defaults, config)
    const promiseChain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // request的拦截器，后加入的先执行
    this.interceptors.request.forEach(interceptor => {
      promiseChain.unshift(interceptor)
    })
    // response的拦截器，先加入的先执行
    this.interceptors.response.forEach(interceptor => {
      promiseChain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    // 链式调用
    while (promiseChain.length) {
      const { resolved, rejected } = promiseChain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this._dispatchRequestWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig) {
    return this._dispatchRequestWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig) {
    return this._dispatchRequestWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig) {
    return this._dispatchRequestWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._dispatchRequestEWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._dispatchRequestEWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._dispatchRequestEWithData('patch', url, data, config)
  }
  _dispatchRequestWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method }))
  }
  _dispatchRequestEWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method, data }))
  }
  getUri(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformUrl(config)
  }
}
