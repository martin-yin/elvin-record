import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleApiEntity } from './entity/role.api.entity';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity, RoleApiEntity]),
  ],
  controllers: [],
  providers: [],
})
export class RoleModule {}
