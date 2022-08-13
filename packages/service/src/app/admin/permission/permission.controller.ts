import { Result } from '@/app/common/interfaces';
import { success } from '@/app/common/utils';
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

  @Get()
  async getAll(): Promise<Result> {
    return await this.permissionService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.permissionService.getOne(id);
  }

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Result> {
    return await this.permissionService.create(createPermissionDto);
  }

  @Put()
  async edit(@Body() editPermissionDto: EditPermissionDto): Promise<Result> {
    return await this.permissionService.edit(editPermissionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.permissionService.remove(id);
    return success('删除Api成功');
  }
}
