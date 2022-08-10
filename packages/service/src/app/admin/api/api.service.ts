import { ApiException } from '@/app/common/exceptions';
import { Result } from '@/app/common/interfaces';
import { success } from '@/app/common/utils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApiDto } from './dtos/create-api.dto';
import { EditApiDto } from './dtos/update-api.dto';
import { ApiEntity } from './entity/api.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(ApiEntity)
    private readonly apiRepository: Repository<ApiEntity>,
  ) {}

  /**
   * 添加Api
   * @param createApiDto
   * @returns
   */
  async create(createApiDto: CreateApiDto) {
    let api: ApiEntity;

    try {
      api = await this.apiRepository.save<ApiEntity>(
        this.apiRepository.create(createApiDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('Api 已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return success('新增成功', api);
  }

  /**
   * 修改Api
   * @param param0
   * @returns
   */
  async edit({ id, path, method, description }: EditApiDto): Promise<Result> {
    let api: ApiEntity;
    const existing = await this.apiRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`修改失败，ID 为 '${id}' 的菜单不存在`, 404);

    try {
      api = await this.apiRepository.save<ApiEntity>(
        this.apiRepository.merge(existing, { path, method, description }),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('Api 已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return success('修改Api成功', api);
  }
}
