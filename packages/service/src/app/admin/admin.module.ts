import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../core/guards';
import { PermissionGuard } from '../core/guards/permission.guard';
import { AuthModule } from './auth/auth.module';
import { DictionaryDetailModule } from './dictionary-detail/dictionary-detail.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RoleModule,
    MenuModule,
    AuthModule,
    UsersModule,
    PermissionModule,
    DictionaryModule,
    DictionaryDetailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports: [],
})
export class AdminModule {}
