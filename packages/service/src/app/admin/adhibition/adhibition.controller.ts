import {
  AUTHORIZE_ADHIBITION_CREATE,
  AUTHORIZE_ADHIBITION_DELETE,
  AUTHORIZE_ADHIBITION_EDIT,
  AUTHORIZE_ADHIBITION_GET,
  AUTHORIZE_ADHIBITION_GETALL,
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
  Query,
} from '@nestjs/common';
import { AdhibitionService } from './adhibition.service';
import { CreateAdhibitionDto } from './dtos/create-adhibition.dto';
import { UpdateAdhibitionDto } from './dtos/update-adhibition.dto';

@Controller('adhibition')
export class AdhibitionController {
  constructor(private readonly adhibitionService: AdhibitionService) {}

  @ApiAuthorize(AUTHORIZE_ADHIBITION_GETALL)
  @Get()
  async getAll(
    @Query('name') name: string,
    @Query('status') status: number,
  ): Promise<Result> {
    console.log(name, status, '===============');
    return await this.adhibitionService.getAll({ name, status });
  }

  @ApiAuthorize(AUTHORIZE_ADHIBITION_GET)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.adhibitionService.getOne(id);
  }

  @ApiAuthorize(AUTHORIZE_ADHIBITION_CREATE)
  @Post()
  async create(
    @Body() createAdhibitionDto: CreateAdhibitionDto,
  ): Promise<Result> {
    return await this.adhibitionService.baseCreate(createAdhibitionDto);
  }

  @ApiAuthorize(AUTHORIZE_ADHIBITION_EDIT)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() updateAdhibitionDto: UpdateAdhibitionDto,
  ): Promise<Result> {
    return await this.adhibitionService.baseEdit(id, updateAdhibitionDto);
  }

  @ApiAuthorize(AUTHORIZE_ADHIBITION_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.adhibitionService.baseDelete(id);
    return success('删除应用成功');
  }
}
