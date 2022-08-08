import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { ElConfigService } from './config.service';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private elConfigService: ElConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      ...this.elConfigService.get('multer'),
    };
  }
}
