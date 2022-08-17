import {
  AUTHORIZE_API_CREATE,
  AUTHORIZE_API_DELETE,
  AUTHORIZE_API_EDIT,
  AUTHORIZE_API_GET,
  AUTHORIZE_API_GETALL,
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
import { ApiService } from './api.service';
import { CreateApiDto, EditApiDto } from './dtos';
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @ApiAuthorize(AUTHORIZE_API_GETALL)
  @Get()
  async getAll(): Promise<Result> {
    return await this.apiService.getAll();
  }

  @ApiAuthorize(AUTHORIZE_API_GET)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.apiService.getOne(id);
  }

  @ApiAuthorize(AUTHORIZE_API_CREATE)
  @Post()
  async create(@Body() createApiDto: CreateApiDto): Promise<Result> {
    return await this.apiService.baseCreate(createApiDto);
  }

  @ApiAuthorize(AUTHORIZE_API_EDIT)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() editApiDto: EditApiDto,
  ): Promise<Result> {
    return await this.apiService.baseEdit(id, editApiDto);
  }

  @ApiAuthorize(AUTHORIZE_API_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.apiService.baseDelete(id);
    return success('删除Api成功');
  }
}
