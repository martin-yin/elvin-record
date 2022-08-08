import { Injectable } from '@nestjs/common';
import { HttpModuleOptionsFactory, HttpModuleOptions } from '@nestjs/axios';
import { ElConfigService } from './config.service';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private elConfigService: ElConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      ...this.elConfigService.get('axios'),
      timeoutErrorMessage: '请求超时，请稍后重试！',
    };
  }
}
