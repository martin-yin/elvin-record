import { success } from '@/app/core/utils';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateSourceMapDto } from './dtos/create-source-map.dto';
import { GetSourceMapDto } from './dtos/get-source-map.dto';

import { SourceMapService } from './source-map.service';

@Controller('source-map')
export class SourceMapController {
  constructor(private readonly sourceMapService: SourceMapService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files[]'))
  async create(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() { release },
  ) {
    const result = await this.sourceMapService.create({ files, release });
    return success('上传source map 成功', result);
  }

  @Get()
  async getAll(@Query() getSourceMapDto: GetSourceMapDto) {
    const result = await this.sourceMapService.getAll(getSourceMapDto);
    return success('获取所有source map 成功', result);
  }
}
