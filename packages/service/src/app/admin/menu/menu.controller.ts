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

  @Get()
  async getAll(): Promise<Result> {
    return await this.menuService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.menuService.getOne(id);
  }

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Result> {
    return await this.menuService.create(createMenuDto);
  }

  @Put()
  async edit(@Body() editMenuDto: EditMenuDto): Promise<Result> {
    return await this.menuService.edit(editMenuDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.menuService.remove(id);
    return success('删除Api成功');
  }
}
