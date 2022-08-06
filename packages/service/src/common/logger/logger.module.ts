import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './providers/logger.service';
import { WinstonConfigService } from './providers/winston.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
