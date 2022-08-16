import {
  AUTHORIZE_PERMISSION_CREATE,
  AUTHORIZE_PERMISSION_DELETE,
  AUTHORIZE_PERMISSION_EDIT,
  AUTHORIZE_PERMISSION_GET,
  AUTHORIZE_PERMISSION_GETALL,
} from '@/app/core/constants';
import { ApiAuthorize } from '@/app/core/decorators';
import { Result } from '@/app/core/interfaces';
import { success } from '@/app/core/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePermissionDto, EditPermissionDto } from './dtos';
import { PermissionService } from './permission.service';
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiAuthorize(AUTHORIZE_PERMISSION_GETALL)
  @Get()
  async getAll(): Promise<Result> {
    return await this.permissionService.getAll();
  }

  @ApiAuthorize(AUTHORIZE_PERMISSION_GET)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.permissionService.getOne(id);
  }

  @ApiAuthorize(AUTHORIZE_PERMISSION_CREATE)
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Result> {
    return await this.permissionService.baseCreate(createPermissionDto);
  }

  @ApiAuthorize(AUTHORIZE_PERMISSION_EDIT)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() editPermissionDto: EditPermissionDto,
  ): Promise<Result> {
    return await this.permissionService.baseEdit(id, editPermissionDto);
  }

  @ApiAuthorize(AUTHORIZE_PERMISSION_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.permissionService.baseDelete(id);
    return success('删除Api成功');
  }
}
