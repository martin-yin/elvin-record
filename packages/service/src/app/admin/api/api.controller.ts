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
import { ApiService } from './api.service';
import { CreateApiDto } from './dtos/create-api.dto';
import { EditApiDto } from './dtos/update-api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getAll(): Promise<Result> {
    return await this.apiService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.apiService.getOne(id);
  }

  @Post()
  async create(@Body() createApiDto: CreateApiDto): Promise<Result> {
    return await this.apiService.create(createApiDto);
  }

  @Put()
  async edit(@Body() editApiDto: EditApiDto): Promise<Result> {
    return await this.apiService.edit(editApiDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    await this.apiService.remove(id);
    return success('删除Api成功');
  }
}
