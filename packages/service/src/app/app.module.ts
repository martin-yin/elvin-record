import { CommonModule } from '@/common';
import { ValidationProvider } from '@/common/providers';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiModule } from './admin/api/api.module';
import { AuthModule } from './admin/auth/auth.module';
import { MenuModule } from './admin/menu/menu.module';
import { RoleModule } from './admin/role/role.module';
import { UsersModule } from './admin/users/users.module';
import { ResourceModule } from './resource/resource.module';
import { UploadFileController } from './upload/upload.controller';

@Module({
  imports: [
    CommonModule,
    ResourceModule,
    RoleModule,
    ApiModule,
    MenuModule,
    AuthModule,
    UsersModule,
  ],
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
