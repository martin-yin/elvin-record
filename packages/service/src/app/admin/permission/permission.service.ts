import { ApiException } from '@/app/common/exceptions';
import { success } from '@/app/common/utils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../menu/entity/menu.entity';
import { PermissionEntity } from './entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  /**
   * 添加Api
   * @param createApiDto
   * @returns
   */
  async create(createDto: any) {
    let permission: PermissionEntity;

    try {
      permission = await this.permissionRepository.save<MenuEntity>(
        this.permissionRepository.create(createDto) as unknown as any,
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('权限已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return success('新增成功', permission);
  }
}
