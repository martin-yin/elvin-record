import {
  AUTHORIZEMENUGETALL,
  AUTHORIZEMENUGET,
  AUTHORIZEMENUCREATE,
  AUTHORIZEMENUEDIT,
  AUTHORIZEMENUDELETE,
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
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Permission(AUTHORIZEMENUGETALL)
  @Get()
  async getAll(): Promise<Result> {
    return await this.menuService.getAll();
  }

  @Permission(AUTHORIZEMENUGET)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.menuService.getOne(id);
  }

  @Permission(AUTHORIZEMENUCREATE)
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Result> {
    return await this.menuService.create(createMenuDto);
  }

  @Permission(AUTHORIZEMENUEDIT)
  @Put()
  async edit(@Body() editMenuDto: EditMenuDto): Promise<Result> {
    return await this.menuService.edit(editMenuDto);
  }

  @Permission(AUTHORIZEMENUDELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.menuService.remove(id);
    return success('删除Api成功');
  }
}
