import { DictionaryDetail } from '@/app/admin/dictionary-detail/entity/dictionary.detail.entity';
import { DictionaryEntity } from '@/app/admin/dictionary/entity/dictionary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity, DictionaryDetail])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
