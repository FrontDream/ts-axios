import { AxiosRequestConfig, AxiosResponsePromise, AxiosResponse } from '../types'
import { xhr } from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosResponsePromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理config
 * @param config
 */
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse) {
  const data = transform(res.data, res.headers, res.config.transformResponse)
  return { ...res, data }
}
