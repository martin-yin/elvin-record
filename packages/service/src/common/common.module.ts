import { Module } from '@nestjs/common';
import {
  DatabaseModule,
  UtilsModule,
  ElConfigModule,
  ElHttpModule,
  ElJwtModule,
  ElMulterModule,
  ElRedisModule,
  ElThrottlerModule,
  ElWinstonModule,
} from './modules';

@Module({
  imports: [
    UtilsModule,
    ElConfigModule,
    ElWinstonModule,
    DatabaseModule,
    ElMulterModule,
    ElRedisModule,
    ElJwtModule,
    ElHttpModule,
    ElThrottlerModule,
  ],
  exports: [
    UtilsModule,
    ElConfigModule,
    ElWinstonModule,
    ElMulterModule,
    ElRedisModule,
    ElJwtModule,
    ElHttpModule,
    ElThrottlerModule,
  ],
})
export class CommonModule {}
