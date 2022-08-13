import { DictionaryDetail } from '@/app/admin/dictionary-detail/entity/dictionary.detail.entity';
import { DictionaryEntity } from '@/app/admin/dictionary/entity/dictionary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryModule } from '../dictionary/dictionary.module';
import { DictionaryDetailController } from './dictionary-detail.controller';
import { DictionaryDetailService } from './dictionary-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DictionaryEntity, DictionaryDetail]),
    DictionaryModule,
  ],
  controllers: [DictionaryDetailController],
  providers: [DictionaryDetailService],
})
export class DictionaryDetailModule {}
