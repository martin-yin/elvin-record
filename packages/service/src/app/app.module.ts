import { ValidationProvider } from '@/app/common/providers';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common';
import { UploadFileController } from './upload/upload.controller';

@Module({
  imports: [CommonModule, AdminModule],
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
