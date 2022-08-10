import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService, ElLogger, ElLoggerService } from '../services';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
  providers: [ElLoggerService, ElLogger],
  exports: [ElLoggerService, ElLogger],
})
export class ElWinstonModule {}
