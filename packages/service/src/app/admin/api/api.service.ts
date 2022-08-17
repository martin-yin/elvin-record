import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiEntity } from './entity/api.entity';

@Injectable()
export class ApiService extends DataBaseService<ApiEntity> {
  constructor(
    @InjectRepository(ApiEntity)
    private readonly apiRepository: Repository<ApiEntity>,
  ) {
    super(apiRepository);
  }

  /**
   * 获取所有许可
   */
  async getAll(): Promise<Result> {
    const users = await this.apiRepository.find();
    if (users) return success('获取所有许可成功', users);
  }

  /**
   * 获取单个许可
   */
  async getOne(id: number): Promise<Result> {
    const user = await this.apiRepository.findOne({ where: { id } });

    if (user) {
      return success('获取许可成功', user);
    } else {
      throw new ApiException(`获取失败，ID 为 '${id}' 的许可不存在`, 404);
    }
  }
}
