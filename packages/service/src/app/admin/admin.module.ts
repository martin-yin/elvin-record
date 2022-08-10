import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../common/guards';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RoleModule, ApiModule, MenuModule, AuthModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AdminModule {}
