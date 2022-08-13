import { DictionaryEntity } from '@/app/admin/dictionary/entity/dictionary.entity';
import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDictionaryDto, GetDictionaryDto } from './dtos';

@Injectable()
export class DictionaryService extends DataBaseService<DictionaryEntity> {
  constructor(
    @InjectRepository(DictionaryEntity)
    private readonly dictionaryRepository: Repository<DictionaryEntity>,
  ) {
    super(dictionaryRepository);
  }

  async create(createDictionaryDto: CreateDictionaryDto): Promise<Result> {
    let dictionary: DictionaryEntity;
    try {
      dictionary = await this.dictionaryRepository.save<DictionaryEntity>(
        this.dictionaryRepository.create(createDictionaryDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('字典已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return success('新增成功', dictionary);
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
