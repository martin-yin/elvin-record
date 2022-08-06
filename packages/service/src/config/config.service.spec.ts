import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SysConfigService } from './providers/config.service';
import { EnvValidate } from './validation';
import DatabaseConfig from './envs/database';
import LoggerConfig from './envs/logger';

describe('SysConfigService', () => {
  let sysConfigService: SysConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
    }).compile();

    sysConfigService = app.get<SysConfigService>(SysConfigService);
  });

  describe('root', () => {
    it('Test"', () => {
      expect(sysConfigService.get('PORT')).toBe(3100);
    });
  });
});
