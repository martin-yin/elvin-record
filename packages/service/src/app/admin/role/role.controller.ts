import { Permission } from '@/app/common/decorators/permission.decorator';
import { JwtAuthGuard } from '@/app/common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto, SaveRoleApisDto, SaveRoleMenusDto } from './dtos';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission(['admin:role:create'])
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
