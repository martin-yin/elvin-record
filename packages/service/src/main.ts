import { NestFactory } from '@nestjs/core';
import { createLogger } from 'winston';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { LoggerService } from './common/logger/providers/logger.service';
import { WinstonConfigService } from './common/logger/providers/winston.service';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { TimeUtil } from './common/utils/time.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = new LoggerService(
    createLogger(new WinstonConfigService().createWinstonModuleOptions()),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(loggerService));
  const timeUtil = new TimeUtil();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // 全局拦截器
  app.useGlobalFilters(
    new AllExceptionsFilter(timeUtil, loggerService),
    new HttpExceptionFilter(timeUtil, loggerService),
  );
  await app.listen(3100);
}
bootstrap();
