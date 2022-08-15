import { InjectionToken } from '@angular/core'
import axios from 'axios'
import { appConfig } from './config'

export const AxiosHttpClient = axios.create({
  baseURL: appConfig.apiUrl
})

export type IHttpClient = typeof AxiosHttpClient

export const httpClientToken = new InjectionToken('AxiosHttpClient');
