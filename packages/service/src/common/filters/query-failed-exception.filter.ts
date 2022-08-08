import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { QueryFailedError } from 'typeorm';
import { QueryException } from '../interfaces';
import { ElLoggerService } from '../services';
import { TimeUtil } from '../utils';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  constructor(
    private timeUtil: TimeUtil,
    private elLoggerService: ElLoggerService,
  ) {}

  catch(exception: QueryException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const data = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      status: false,
      message: exception.message,
      time: this.timeUtil.CurrentTime,
      path: req.url,
    };

    this.elLoggerService.setContext(QueryFailedExceptionFilter.name);
    this.elLoggerService.exception(
      HttpStatus.INTERNAL_SERVER_ERROR,
      data,
      req,
      exception,
    );

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);
  }
}
