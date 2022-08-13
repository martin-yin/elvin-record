import { AUTHORIZEROLECREATE, AUTHORIZEROLEGET } from '@/app/core/constants';
import { Permission } from '@/app/core/decorators/permission.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dtos';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission(AUTHORIZEROLECREATE)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  // @Permission(AUTHORIZEROLESAVEROLEMENUS)
  // @Post('saveRoleMenus')
  // async saveRoleMenus(@Body() saveRoleMenusDto: SaveRoleMenusDto) {
  //   return await this.roleService.saveRoleMenus(saveRoleMenusDto);
  // }

  // @Permission(AUTHORIZEROLESAVEROLEAPIS)
  // @Post('saveRolePermissionList')
  // async saveRolePermissionList(
  //   @Body() saveRolePermissionListDto: SaveRolePermissionListDto,
  // ) {
  //   return await this.roleService.saveRolePermissionList(
  //     saveRolePermissionListDto,
  //   );
  // }

  @Permission(AUTHORIZEROLEGET)
  @Get()
  async get() {
    await this.roleService.getAll();
  }
}
