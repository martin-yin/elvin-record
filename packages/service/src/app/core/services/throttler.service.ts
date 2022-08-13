import { Injectable } from '@nestjs/common';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { ElConfigService } from './config.service';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private elConfigService: ElConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ...this.elConfigService.get('throttler'),
    };
  }
}
