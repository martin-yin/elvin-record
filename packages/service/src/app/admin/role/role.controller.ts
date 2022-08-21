import {
  AUTHORIZE_ROLE_CREATE,
  AUTHORIZE_ROLE_GET,
  AUTHORIZE_ROLE_GETALL,
  AUTHORIZE_ROLE_SAVEROLEMENUS,
} from '@/app/core/constants';
import { ApiAuthorize } from '@/app/core/decorators/api.authorize.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto, SaveRoleMenusDto } from './dtos';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiAuthorize(AUTHORIZE_ROLE_CREATE)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.baseCreate(createRoleDto);
  }

  @ApiAuthorize(AUTHORIZE_ROLE_SAVEROLEMENUS)
  @Post('saveRoleMenus')
  async saveRoleMenus(@Body() saveRoleMenusDto: SaveRoleMenusDto) {
    return await this.roleService.saveRoleMenus(saveRoleMenusDto);
  }

  // @Permission(AUTHORIZEROLESAVEROLEAPIS)
  // @Post('saveRolePermissionList')
  // async saveRolePermissionList(
  //   @Body() saveRolePermissionListDto: SaveRolePermissionListDto,
  // ) {
  //   return await this.roleService.saveRolePermissionList(
  //     saveRolePermissionListDto,
  //   );
  // }

  @ApiAuthorize(AUTHORIZE_ROLE_GETALL)
  @Get()
  async getAll() {
    return await this.roleService.getAll();
  }

  @ApiAuthorize(AUTHORIZE_ROLE_GET)
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.roleService.findOne(id);
  }
}
