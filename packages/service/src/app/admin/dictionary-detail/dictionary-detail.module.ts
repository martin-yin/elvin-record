import { DictionaryDetail } from '@/app/common/entity/dictionary.detail.entity';
import { Dictionary } from '@/app/common/entity/dictionary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryModule } from '../dictionary/dictionary.module';
import { DictionaryDetailController } from './dictionary-detail.controller';
import { DictionaryDetailService } from './dictionary-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dictionary, DictionaryDetail]),
    DictionaryModule,
  ],
  controllers: [DictionaryDetailController],
  providers: [DictionaryDetailService],
})
export class DictionaryDetailModule {}
