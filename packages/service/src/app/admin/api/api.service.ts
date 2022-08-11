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
   * @param param
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

  /**
   * 删除用户
   *
   * @param id 用户ID
   */
  async remove(id: number): Promise<void> {
    const existing = await this.apiRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`删除失败，ID 为 '${id}' 的API不存在`, 404);
    await this.apiRepository.remove(existing);
  }

  /**
   * 获取所有用户
   */
  async getAll(): Promise<Result> {
    const users = await this.apiRepository.find();
    if (users) return success('获取所有Api成功', users);
  }

  /**
   * 获取单个APi
   */
  async getOne(id: number): Promise<Result> {
    const user = await this.apiRepository.findOne({ where: { id } });

    if (user) {
      return success('获取Api成功', user);
    } else {
      throw new ApiException(`获取失败，ID 为 '${id}' 的Api不存在`, 404);
    }
  }
}
