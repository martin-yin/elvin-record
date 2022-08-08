import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from '../services';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  exports: [HttpModule],
})
export class ElHttpModule {}
