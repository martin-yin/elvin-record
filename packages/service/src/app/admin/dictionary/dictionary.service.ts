import { DictionaryEntity } from '@/app/admin/dictionary/entity/dictionary.entity';
import { DataBaseService } from '@/app/core/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetDictionaryDto } from './dtos';

@Injectable()
export class DictionaryService extends DataBaseService<DictionaryEntity> {
  constructor(
    @InjectRepository(DictionaryEntity)
    private readonly dictionaryRepository: Repository<DictionaryEntity>,
  ) {
    super(dictionaryRepository);
  }

  async getAll({ pageIndex, pageSize, name, type, desc }: GetDictionaryDto) {
    const data = await this.dictionaryRepository.findAndCount({
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
      where: {
        name,
        type,
        desc,
      },
    });
    return { list: data[0], count: data[1] };
  }
}
