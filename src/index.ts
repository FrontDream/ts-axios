import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types'

function  createInstance(): AxiosInstance{
  const instance = new Axios();
  const request = Axios.prototype.request.bind(instance)
  extend(request, instance)
  return request as AxiosInstance
}

const axios = createInstance()

export  default  axios;

export * from './types';
