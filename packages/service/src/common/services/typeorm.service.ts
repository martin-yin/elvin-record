import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ElConfigService } from './config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private elConfigService: ElConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.elConfigService.get('typeorm'),
      autoLoadEntities: true,
      verboseRetryLog: true,
      keepConnectionAlive: true,
    };
  }
}
