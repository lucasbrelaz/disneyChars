import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

async function requestInterceptor(config: AxiosRequestConfig) {
  return config
}

function requestInterceptorError(error: AxiosError) {
  return Promise.reject(error)
}

function responseInterceptor(response: AxiosResponse) {
  // console.info('Response Interceptor')
  return response
}

function responseInterceptorError(error: AxiosError<any>) {
  return Promise.reject(error)
}

export {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError,
}
