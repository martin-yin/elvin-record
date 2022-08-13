import {
  AUTHORIZEPERMISSIONCREATE,
  AUTHORIZEPERMISSIONDELETE,
  AUTHORIZEPERMISSIONEDIT,
  AUTHORIZEPERMISSIONGET,
  AUTHORIZEPERMISSIONGETALL,
} from '@/app/core/constants';
import { Permission } from '@/app/core/decorators/permission.decorator';
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

  @Permission(AUTHORIZEPERMISSIONGETALL)
  @Get()
  async getAll(): Promise<Result> {
    return await this.permissionService.getAll();
  }

  @Permission(AUTHORIZEPERMISSIONGET)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.permissionService.getOne(id);
  }

  @Permission(AUTHORIZEPERMISSIONCREATE)
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Result> {
    return await this.permissionService.baseCreate(createPermissionDto);
  }

  @Permission(AUTHORIZEPERMISSIONEDIT)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() editPermissionDto: EditPermissionDto,
  ): Promise<Result> {
    return await this.permissionService.baseEdit(id, editPermissionDto);
  }

  @Permission(AUTHORIZEPERMISSIONDELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.permissionService.baseDelete(id);
    return success('删除Api成功');
  }
}
