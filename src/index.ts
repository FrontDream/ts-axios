import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosStatic, AxiosRequestConfig } from './types'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const instance = new Axios(config)
  const request = Axios.prototype.request.bind(instance)
  extend(request, instance)
  return request as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios

export * from './types'
