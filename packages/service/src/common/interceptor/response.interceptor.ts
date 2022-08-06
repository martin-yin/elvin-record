import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../logger/providers/logger.service';

export interface Response<T> {
  data: T;
}
/**
 * 这个请求拦截先留着 虽然确定会不会用到！
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    let params = {};
    if (req.method === 'POST') {
      params = req.body;
    } else if (req.method === 'GET') {
      params = req.query;
    }

    this.loggerService.setContext(ResponseInterceptor.name);
    this.loggerService.info(
      `开始...\n ${req.method} 请求地址: ${req.originalUrl} 请求IP: ${
        req.ip
      }\n 请求参数: ${JSON.stringify(params)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      map((data: T) => {
        const logFormat = `响应内容: ${JSON.stringify(data)}\n结束... ${
          '耗时: ' + (Date.now() - now) + 'ms'
        }`;
        this.loggerService.http(res.statusCode, logFormat);
        return {
          code: 0,
          data: data,
        };
      }),
    );
  }
}
