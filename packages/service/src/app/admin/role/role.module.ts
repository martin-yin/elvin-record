import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';
import { RolePermissionEntity } from './entity/role.permission.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RoleMenuEntity,
      RolePermissionEntity,
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
