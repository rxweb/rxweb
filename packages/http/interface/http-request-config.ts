export interface HttpRequestConfig {
    hostUri?: string;
    path?: string;
    params?: any[];
    queryParams?: { [key: string]: any }
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
}