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
    @Body() { release },
  ) {
    const result = await this.sourceMapService.create({ files, release });
    return success('上传source map 成功', result);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file, @Body() body) {
  //   // 这里捕获错误，因为上传可能有各种各样的未知原因报错
  //   try {
  //     const fileName = `${Date.parse(Date())}.${file.originalname}`;
  //     const writeImage = createWriteStream(
  //       path.join(
  //         __dirname,
  //         '../../../../',
  //         'upload',
  //         `${file.originalname}-${Date.now()}-${file.originalname}`,
  //       ),
  //     );
  //     writeImage.write(file.buffer);
  //     return {
  //       filePath: `/upload/${fileName}`,
  //       size: file.size,
  //       fileName,
  //       originalname: file.originalname,
  //       mimetype: file.mimetype,
  //     };
  //   } catch (e) {
  //     throw new HttpException(e, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
