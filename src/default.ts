import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data, headers) {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data) {
      return transformResponse(data)
    }
  ],
  validateStatus: (status: number) => {
    if (status >= 200 && status < 300) {
      return true
    }
    return false
  }
}

const withoutData = ['get', 'head', 'options', 'delete']

withoutData.forEach(name => {
  defaults.headers[name] = {}
})

const withData = ['post', 'put', 'patch']

withData.forEach(name => {
  defaults.headers[name] = {
    'Content-Type': 'application/x-www-form-urlencoded;'
  }
})

export default defaults
