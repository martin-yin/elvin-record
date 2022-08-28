import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from './entity/menu.entity';

function formatToTree(ary: Array<any>, pid = 0) {
  return ary
    .filter((item) =>
      // 如果没有父id（第一次递归的时候）将所有父级查询出来
      // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
      pid === undefined ? item.parentId === 0 : item.parentId === pid,
    )
    .map((item) => {
      // 通过父节点ID查询所有子节点
      item.children = formatToTree(ary, item.id);
      if (item.children.length === 0) {
        delete item.children;
      }
      return item;
    });
}

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
  async getAll(adhibition?: string, tree = 1): Promise<any> {
    const menuList = await this.menuRepository.find({
      where: { adhibition },
      order: { sort: 'ASC' },
    });
    if (menuList) return tree === 1 ? formatToTree(menuList) : menuList;
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
