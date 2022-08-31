import { FileService } from '@/app/core/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceMapEntity } from './entity/source-map.entity';
import { SourceMapController } from './source-map.controller';
import { SourceMapService } from './source-map.service';

@Module({
  imports: [TypeOrmModule.forFeature([SourceMapEntity])],
  controllers: [SourceMapController],
  providers: [SourceMapService, FileService],
  exports: [SourceMapService],
})
export class SourceMapModule {}
