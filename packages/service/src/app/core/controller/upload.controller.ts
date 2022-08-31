import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import * as path from 'path';

@Controller('upload')
export class UploadFileController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Body() body) {
    // 这里捕获错误，因为上传可能有各种各样的未知原因报错
    try {
      const fileName = `${Date.parse(Date())}.${file.originalname}`;
      const writeImage = createWriteStream(
        path.join(
          __dirname,
          '../../../../',
          'upload',
          `${file.originalname}-${Date.now()}-${file.originalname}`,
        ),
      );
      writeImage.write(file.buffer);

      return {
        filePath: `/upload/${fileName}`,
        size: file.size,
        fileName,
        originalname: file.originalname,
        mimetype: file.mimetype,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
