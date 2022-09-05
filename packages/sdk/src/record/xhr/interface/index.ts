export type voidFun = () => void;

export enum HTTPTYPE {
  XHR = 'xhr',
  FETCH = 'fetch'
}

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

export interface RecordXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any;
  beforeRecordXhrData: RecordXhrData;
}

export interface RecordXhrData {
  method: HttpMethod;
  url: string;
  type: HTTPTYPE;
  httpUrl: string;
  status: number;
  statusText: string;
  responseText: string;
  requestText: string;
  happenTime: number;
  loadTime: number;
  requestData: string;
}

export function on(
  target: { addEventListener: Function },
  eventName: keyof XMLHttpRequestEventTargetEventMap,
  handler: Function,
  opitons: boolean | unknown = false
): void {
  target.addEventListener(eventName, handler, opitons);
}
