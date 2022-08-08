import { Injectable } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ElConfigService } from './config.service';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private elConfigService: ElConfigService) {}

  createRedisOptions(): RedisModuleOptions {
    return {
      readyLog: false,
      config: this.elConfigService.get('redis'),
    };
  }
}
