import { ValidationProvider } from '@/app/core/providers';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core';
import { UploadFileController } from './core/controller/upload.controller';

@Module({
  imports: [CoreModule, AdminModule],
  controllers: [UploadFileController],
  providers: [
    ValidationProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
