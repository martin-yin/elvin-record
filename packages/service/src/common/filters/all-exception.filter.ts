import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ElLoggerService } from '../services';
import { TimeUtil } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private timeUtil: TimeUtil,
    private elLoggerService: ElLoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const data = {
      code,
      status: false,
      time: this.timeUtil.CurrentTime,
      path: req.url,
      error: exception.message,
    };

    this.elLoggerService.setContext(AllExceptionsFilter.name);
    this.elLoggerService.exception(code, data, req, exception);

    res.status(code).json(data);
  }
}
