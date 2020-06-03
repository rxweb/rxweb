import { HttpRequestConfig } from './http-request-config'

export interface HttpRequestBodyConfig extends HttpRequestConfig {
    body: any;
}