import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvValidate } from './validation';
import DatabaseConfig from './envs/database';
import LoggerConfig from './envs/logger';
import { SysConfigService } from './providers/config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [DatabaseConfig, LoggerConfig],
      validate: EnvValidate,
    }),
  ],
  providers: [SysConfigService],
  exports: [SysConfigService],
})
export class SysConfigModule {}
