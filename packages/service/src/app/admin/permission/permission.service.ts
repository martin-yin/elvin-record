import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './entity/permission.entity';

@Injectable()
export class PermissionService extends DataBaseService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {
    super(permissionRepository);
  }

  /**
   * 获取所有许可
   */
  async getAll(): Promise<Result> {
    const users = await this.permissionRepository.find();
    if (users) return success('获取所有许可成功', users);
  }

  /**
   * 获取单个许可
   */
  async getOne(id: number): Promise<Result> {
    const user = await this.permissionRepository.findOne({ where: { id } });

    if (user) {
      return success('获取许可成功', user);
    } else {
      throw new ApiException(`获取失败，ID 为 '${id}' 的许可不存在`, 404);
    }
  }
}
