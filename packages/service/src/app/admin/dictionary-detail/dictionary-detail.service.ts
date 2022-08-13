import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictionaryDetail } from '@/app/admin/dictionary-detail/entity/dictionary.detail.entity';
import { Repository } from 'typeorm';
import { DictionaryService } from '../dictionary/dictionary.service';
import { DataBaseService } from '@/app/core/services';
import { CreateDictionaryDetailDto } from './dtos';

@Injectable()
export class DictionaryDetailService extends DataBaseService<DictionaryDetail> {
  constructor(
    @InjectRepository(DictionaryDetail)
    private readonly dictionaryDetailRepository: Repository<DictionaryDetail>,
    private readonly dictionaryService: DictionaryService,
  ) {
    super(dictionaryDetailRepository);
  }

  async create(createDictionaryDetailDto: CreateDictionaryDetailDto) {
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
      where: { id },
      relations: ['dictionary'],
    });
  }
}
