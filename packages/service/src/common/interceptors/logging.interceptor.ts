import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color } from '../enums';
import { Result } from '../interfaces';
import { ElLoggerService } from '../services';

import { ColorUtil } from '../utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private colorUtil: ColorUtil,
    private elLoggerService: ElLoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 解析ExecutionContext的数据内容获取请求体
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    let params = {};
    if (req.method === 'POST') {
      params = req.body;
    } else if (req.method === 'GET') {
      params = req.query;
    }

    this.elLoggerService.setContext(LoggingInterceptor.name);
    this.elLoggerService.info(
      `开始...\n ${req.method} 请求地址: ${req.originalUrl} 请求IP: ${
        req.ip
      }\n 请求参数: ${JSON.stringify(params)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      map((data: Result) => {
        let content = JSON.stringify(data);
        const maxSize = 2000;
        if (content.length > maxSize)
          content = `${content.substring(0, maxSize)}...`;

        const logFormat = `响应内容: ${content}\n 结束... ${this.colorUtil.hex(
          Color.warn,
          '耗时: ' + (Date.now() - now) + 'ms',
        )}`;
        this.elLoggerService.http(res.statusCode, logFormat);
        return data;
      }),
    );
  }
}
