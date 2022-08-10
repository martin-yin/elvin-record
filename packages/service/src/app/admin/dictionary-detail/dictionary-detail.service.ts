import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictionaryDetail } from '@/app/common/entity/dictionary.detail.entity';
import { Repository } from 'typeorm';
import { DictionaryService } from '../dictionary/dictionary.service';
import { CreateDictionaryDetailDto } from './dictionary-detail.dto';
import { DataBaseService } from '@/app/common/services';

@Injectable()
export class DictionaryDetailService extends DataBaseService<DictionaryDetail> {
  constructor(
    @InjectRepository(DictionaryDetail)
    private readonly dictionaryDetailRepository: Repository<DictionaryDetail>,
    private readonly dictionaryService: DictionaryService,
  ) {
    super(dictionaryDetailRepository);
  }

  async createDetail(createDictionaryDetailDto: CreateDictionaryDetailDto) {
    const dictionaryDetail = new DictionaryDetail();
    dictionaryDetail.label = createDictionaryDetailDto.label;
    dictionaryDetail.value = createDictionaryDetailDto.value;
    dictionaryDetail.sort = createDictionaryDetailDto.sort;
    dictionaryDetail.dictionary = await this.dictionaryService.findOne(
      createDictionaryDetailDto.dictionaryId,
    );
    return this.dictionaryDetailRepository.save(dictionaryDetail);
  }

  async detail(id: number) {
    return await this.dictionaryDetailRepository.findOne({
      relations: ['dictionary'],
    });
  }
}
