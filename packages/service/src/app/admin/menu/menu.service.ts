import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from './entity/menu.entity';

@Injectable()
export class MenuService extends DataBaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {
    super(menuRepository);
  }

  /**
   * 删除菜单
   *
   * @param id 用户ID
   */
  async remove(id: number): Promise<void> {
    const existing = await this.menuRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`删除失败，ID 为 '${id}' 的菜单不存在`, 404);
    await this.menuRepository.remove(existing);
  }

  /**
   * 获取所有菜单
   */
  async getAll(): Promise<Result> {
    const menuList = await this.menuRepository.find();
    if (menuList) return success('获取所有菜单成功', menuList);
  }

  /**
   * 获取单个APi
   */
  async getOne(id: number): Promise<Result> {
    const menu = await this.menuRepository.findOne({ where: { id } });

    if (menu) {
      return success('获取菜单成功', menu);
    } else {
      throw new ApiException(`获取失败，ID 为 '${id}' 的菜单不存在`, 404);
    }
  }
}
