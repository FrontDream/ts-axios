import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig } from './types'
import defaults from './default'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const instance = new Axios(config)
  const request = Axios.prototype.request.bind(instance)
  extend(request, instance)
  return request as AxiosInstance
}

const axios = createInstance(defaults)

export default axios

export * from './types'
