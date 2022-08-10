import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from '@/app/common/entity/dictionary.entity';
import { Repository } from 'typeorm';
import { GetDictionaryDto } from './dictionary.dto';
import { DataBaseService } from '@/app/common/services';

@Injectable()
export class DictionaryService extends DataBaseService<Dictionary> {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
  ) {
    super(dictionaryRepository);
  }

  async list({ pageIndex, pageSize, name, type, desc }: GetDictionaryDto) {
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
