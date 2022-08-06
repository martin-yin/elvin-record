import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/providers/logger.service';
import { TimeUtil } from '../utils/time.util';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private timeUtil: TimeUtil,
    private loggerService: LoggerService,
  ) {}

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const error_res = {
      data: null,
      error: exception.message,
      code: exception.status,
      time: this.timeUtil.CurrentTime,
      path: req.url,
    };

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.loggerService.setContext(HttpExceptionFilter.name);
    const logFormat = `${req.method} 请求地址: ${req.originalUrl} 请求IP: ${
      req.ip
    }\n 状态码：${status} \n 响应内容: ${JSON.stringify(error_res)}`;
    this.loggerService.http(status, logFormat);
    res.status(status).json(error_res);
  }
}
