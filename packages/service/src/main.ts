declare const module: any;
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import {
  HttpExceptionFilter,
  QueryFailedExceptionFilter,
} from './app/core/filters';
import { AllExceptionsFilter } from './app/core/filters/all-exception.filter';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './app/core/interceptors';
import { ElConfigService, ElLoggerService } from './app/core/services';
import { ColorUtil } from './app/core/utils';
import { TimeUtil } from './app/core/utils/time.util';
import helmet from 'helmet';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const elConfigService = app.get(ElConfigService);
  const colorUtil = app.get(ColorUtil);
  const timeUtil = app.get(TimeUtil);
  const elLoggerService = app.resolve(ElLoggerService);

  const port = elConfigService.get<number>('PORT');

  // 全局前缀
  app.setGlobalPrefix('api');

  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(json({ limit: '50mb' }));

  // 设置HTTP标头
  app.use(helmet());

  // 全局拦截器
  app.useGlobalInterceptors(
    new LoggingInterceptor(colorUtil, await elLoggerService),
    new TransformInterceptor(timeUtil),
  );

  // 全局过滤器
  app.useGlobalFilters(
    new AllExceptionsFilter(timeUtil, await elLoggerService),
    new HttpExceptionFilter(timeUtil, await elLoggerService),
    new QueryFailedExceptionFilter(timeUtil, await elLoggerService),
  );

  // 开始监听关闭挂钩
  app.enableShutdownHooks();

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
