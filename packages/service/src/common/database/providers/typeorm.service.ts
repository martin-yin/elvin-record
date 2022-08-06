import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SysConfigService } from '../../../config/providers/config.service';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: SysConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.configService.get('database'),
      autoLoadEntities: true,
      keepConnectionAlive: true,
    };
  }
}
