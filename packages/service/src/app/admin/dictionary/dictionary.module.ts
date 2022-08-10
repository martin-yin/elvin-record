import { DictionaryDetail } from '@/app/common/entity/dictionary.detail.entity';
import { Dictionary } from '@/app/common/entity/dictionary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, DictionaryDetail])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
