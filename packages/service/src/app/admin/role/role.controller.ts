import { PermissionOptional } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto, SaveRoleApisDto, SaveRoleMenusDto } from './dtos';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard)
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
  @PermissionOptional()
  async get() {
    await this.roleService.getRoleApi(1);
  }
}
