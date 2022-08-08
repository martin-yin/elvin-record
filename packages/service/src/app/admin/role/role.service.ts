import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleApiEntity } from './entity/role.api.entity';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,

    @InjectRepository(RoleApiEntity)
    private readonly roleApiRepository: Repository<RoleApiEntity>,
  ) {}
}
