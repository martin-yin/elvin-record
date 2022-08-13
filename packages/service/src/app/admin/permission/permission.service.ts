import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { success } from '@/app/core/utils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dtos';
import { EditPermissionDto } from './dtos/edit-permission.dto';
import { PermissionEntity } from './entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  /**
   * 添加许可
   * @param createPermissionDto
   * @returns
   */
  async create(createPermissionDto: CreatePermissionDto) {
    let permission: PermissionEntity;

    try {
      permission = await this.permissionRepository.save<PermissionEntity>(
        this.permissionRepository.create(createPermissionDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('许可已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return success('新增成功', permission);
  }

  /**
   * 添加
   * @param createPermissionDto
   * @returns
   */
  async edit({
    id,
    name,
    code,
    url,
    categoryId,
    remark,
  }: EditPermissionDto): Promise<Result> {
    let permission: PermissionEntity;

    const existing = await this.permissionRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`修改失败，ID 为 '${id}' 许可不存在`, 404);

    try {
      permission = await this.permissionRepository.save<PermissionEntity>(
        this.permissionRepository.merge(existing, {
          name,
          code,
          url,
          categoryId,
          remark,
        }),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('许可已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return success('修改许可成功', permission);
  }

  /**
   * 删除许可
   *
   * @param id 许可ID
   */
  async remove(id: number): Promise<void> {
    const existing = await this.permissionRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`删除失败，ID 为 '${id}' 的许可不存在`, 404);
    await this.permissionRepository.remove(existing);
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
