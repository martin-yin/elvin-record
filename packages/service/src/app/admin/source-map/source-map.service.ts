import { DataBaseService } from '@/app/core/services';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSourceMapDto } from './dtos/get-source-map.dto';
import { SourceMapEntity } from './entity/source-map.entity';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import * as path from 'path';
import { FileService } from '@/app/core/services/file.service';

@Injectable()
export class SourceMapService extends DataBaseService<SourceMapEntity> {
  constructor(
    @InjectRepository(SourceMapEntity)
    private readonly sourcemapRepository: Repository<SourceMapEntity>,
    private fileService: FileService,
  ) {
    super(sourcemapRepository);
  }

  async getAll(getSourceMapDto: GetSourceMapDto) {
    return await this.sourcemapRepository.find({
      where: {
        ...getSourceMapDto,
      },
    });
  }

  async create({ files, release }) {
    try {
      const writeFile = files.map((file) => {
        // 存储到服务器后的文件名称
        const serviceFileName = `${file.originalname}-${Date.now()}-${
          file.originalname
        }`;
        const serviceFileDir = `upload/${release}-source-map`;
        const fileDirPath = path.join(
          __dirname,
          '../../../../',
          `upload/${release}-source-map`,
        );
        const relativePath = `${serviceFileDir}/${serviceFileName}`;
        const filePath = path.join(serviceFileDir, serviceFileName);
        const witeResult = this.fileService.writeFile(fileDirPath, filePath);
        if (witeResult) {
          return this.sourcemapRepository.create({
            name: file.originalname,
            size: file.size,
            path: relativePath,
            monitorId: '',
            release,
          });
        }
      });
      return this.sourcemapRepository.save(writeFile);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
