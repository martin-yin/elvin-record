import { SourceMapService } from '@/app/admin/source-map/source-map.service';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { success } from '../utils';

@Controller('upload')
export class UploadFileController {
  constructor(private readonly sourceMapService: SourceMapService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files[]'))
  async create(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() { release, appId, urlPrefix },
  ) {
    const result = await this.sourceMapService.create({
      files,
      release,
      appId,
      urlPrefix,
    });
    return success('上传source map 成功', result);
  }
}
