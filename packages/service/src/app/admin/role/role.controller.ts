import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto, SaveRoleApisDto, SaveRoleMenusDto } from './dtos';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Post('saveRoleMenus')
  async saveRoleMenus(@Body() saveRoleMenusDto: SaveRoleMenusDto) {
    return await this.roleService.saveRoleMenus(saveRoleMenusDto);
  }

  @Post('saveRoleApis')
  async saveRoleApis(@Body() saveRoleApisDto: SaveRoleApisDto) {
    return await this.roleService.saveRoleApis(saveRoleApisDto);
  }

  @Get()
  async get() {
    await this.roleService.getRoleApi(1);
  }
}
