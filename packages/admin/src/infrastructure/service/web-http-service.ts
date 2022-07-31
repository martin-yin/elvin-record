import type { AxiosRequestConfig } from 'axios';
import type { HttpService } from '../interface/http';
import type { IResponse } from '../lib/request';
import { request } from '../lib/request';

export class WebHttpService implements HttpService {
  get<T, S>(url: string, params: S, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return request<T>('get', url, params, config);
  }
  post<T, S>(url: string, body: S, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return request<T>('post', url, body, config);
  }
  put<T, S>(url: string, body: S, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return request<T>('put', url, body, config);
  }
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return request<T>('delete', url, {}, config);
  }
}
