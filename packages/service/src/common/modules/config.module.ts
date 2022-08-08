import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AxiosConfig,
  JwtConfig,
  MulterConfig,
  RedisConfig,
  ThrottlerConfig,
  TypeormConfig,
} from '../configs';
import { ElConfigService } from '../services';
import { EnvValidate } from '../validations';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: EnvValidate,
      load: [
        AxiosConfig,
        TypeormConfig,
        MulterConfig,
        RedisConfig,
        ThrottlerConfig,
        JwtConfig,
      ],
      expandVariables: true,
    }),
  ],
  providers: [ConfigService, ElConfigService],
  exports: [ConfigService, ElConfigService],
})
export class ElConfigModule {}
