import { CommonModule } from '@/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleApiEntity } from './entity/role.api.entity';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity, RoleApiEntity]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
