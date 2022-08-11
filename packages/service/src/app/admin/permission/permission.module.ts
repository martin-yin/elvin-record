import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entity/permission.entity';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class RoleModule {}
