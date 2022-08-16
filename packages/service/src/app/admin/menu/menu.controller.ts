import {
  AUTHORIZE_MENU_CREATE,
  AUTHORIZE_MENU_DELETE,
  AUTHORIZE_MENU_EDIT,
  AUTHORIZE_MENU_GET,
  AUTHORIZE_MENU_GETALL,
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
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Get()
  async getAll(): Promise<Result> {
    return await this.menuService.getAll();
  }

  @ApiAuthorize(AUTHORIZE_MENU_GET)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.menuService.getOne(id);
  }

  @ApiAuthorize(AUTHORIZE_MENU_CREATE)
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Result> {
    return await this.menuService.baseCreate(createMenuDto);
  }

  @ApiAuthorize(AUTHORIZE_MENU_EDIT)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() editMenuDto: EditMenuDto,
  ): Promise<Result> {
    return await this.menuService.baseEdit(id, editMenuDto);
  }

  @ApiAuthorize(AUTHORIZE_MENU_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.menuService.baseDelete(id);
    return success('删除菜单成功');
  }
}
