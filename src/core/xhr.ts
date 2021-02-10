import { AxiosRequestConfig, AxiosResponsePromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export function xhr(config: AxiosRequestConfig): AxiosResponsePromise {
  return new Promise((resolve, reject) => {
    const {
      method = 'get',
      url,
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest() {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents() {
      request.onreadystatechange = function() {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 0) {
          return
        }
        const responseData = responseType === 'text' ? request.responseText : request.response
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const response: AxiosResponse = {
          config,
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          request,
          headers: responseHeaders
        }
        handleResponse(response)
      }
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }
      request.ontimeout = function handleTimeOut() {
        reject(createError(`timeout of ${timeout} exceeds`, config, 'ECONNABORTED', request))
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(`${auth.username}:${auth.password}`)
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
      Object.keys(headers).forEach(head => {
        if (data === null && head.toLowerCase() === 'content-type') {
          delete headers[head]
        } else {
          request.setRequestHeader(head, headers[head])
        }
      })
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.promise
          .then(reason => {
            request.abort()
            reject(reason)
          })
          .catch(
            /* istanbul ignore next */
            () => {
              // do nothing
            }
          )
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
