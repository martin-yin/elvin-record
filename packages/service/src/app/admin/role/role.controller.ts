import {
  AUTHORIZE_ROLE_CREATE,
  AUTHORIZE_ROLE_GET,
} from '@/app/core/constants';
import { ApiAuthorize } from '@/app/core/decorators/api.authorize.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dtos';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiAuthorize(AUTHORIZE_ROLE_CREATE)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.baseCreate(createRoleDto);
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

  @ApiAuthorize(AUTHORIZE_ROLE_GET)
  @Get()
  async get() {
    await this.roleService.getAll();
  }
}
