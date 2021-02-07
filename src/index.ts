import { AxiosRequestConfig, AxiosResponsePromise, AxiosResponse } from './types';
import { xhr } from './xhr';
import { buildURL } from './helpers/url';
import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/headers';


function  axios(config:AxiosRequestConfig):AxiosResponsePromise{
  processConfig(config)
  return xhr(config).then(res=>{
    return transformResponseData(res)
  })
}

/**
 * 处理config
 * @param config
 */
function processConfig(config: AxiosRequestConfig){
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig){
  const { url, params } = config
  return buildURL(url, params)
}
export default axios

function transformRequestData(config: AxiosRequestConfig){
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig){
  const { headers={}, data } = config
  return processHeaders(headers, data)
}
function transformResponseData(res: AxiosResponse){
  const data = transformResponse(res.data)
  return {...res, data}
}
