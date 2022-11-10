import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError,
} from 'config/axiosInterceptor'

const Axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVICESURL,
  auth: {
    username: import.meta.env.VITE_USER!,
    password: import.meta.env.VITE_PASSWORD!,
  },
})

Axios.interceptors.request.use(requestInterceptor, requestInterceptorError)
Axios.interceptors.response.use(responseInterceptor, responseInterceptorError)

const defaults: AxiosRequestConfig = {
  headers: {},
}

export { Axios, defaults }
