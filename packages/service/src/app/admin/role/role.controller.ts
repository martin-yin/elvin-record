import {
  PERISSIONROLECREATE,
  PERISSIONROLEGET,
  PERISSIONROLESAVEROLEAPIS,
} from '@/app/core/constants';
import { Permission } from '@/app/core/decorators/permission.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto, SaveRoleApisDto, SaveRoleMenusDto } from './dtos';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission(PERISSIONROLECREATE)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Permission(PERISSIONROLESAVEROLEAPIS)
  @Post('saveRoleMenus')
  async saveRoleMenus(@Body() saveRoleMenusDto: SaveRoleMenusDto) {
    return await this.roleService.saveRoleMenus(saveRoleMenusDto);
  }

  @Permission(PERISSIONROLESAVEROLEAPIS)
  @Post('saveRoleApis')
  async saveRoleApis(@Body() saveRoleApisDto: SaveRoleApisDto) {
    return await this.roleService.saveRoleApis(saveRoleApisDto);
  }

  @Permission(PERISSIONROLEGET)
  @Get()
  async get() {
    await this.roleService.getAll();
  }
}
