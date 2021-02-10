import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosStatic, AxiosRequestConfig } from './types'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const instance = new Axios(config)
  const request = Axios.prototype.request.bind(instance)
  // 混合对象
  extend(request, instance)
  return request as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken

axios.Cancel = Cancel

axios.isCancel = isCancel

axios.all = function(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios

export * from './types'
