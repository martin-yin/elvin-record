import { ApiException } from '@/app/common/exceptions';
import { Result } from '@/app/common/interfaces';
import { success } from '@/app/common/utils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entity/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  /**
   * 添加菜单
   * @param createMenuDto
   * @returns
   */
  async create(createMenuDto: CreateMenuDto) {
    let menu: MenuEntity;

    try {
      menu = await this.menuRepository.save<MenuEntity>(
        this.menuRepository.create(createMenuDto),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('菜单已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return success('新增成功', menu);
  }

  /**
   * 修改Api
   * @param param
   * @returns
   */
  async edit({
    id,
    parentId,
    router,
    perms,
    icon,
    sort,
    viewPath,
    keepalive,
  }: EditMenuDto): Promise<Result> {
    let menu: MenuEntity;

    const existing = await this.menuRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`修改失败，ID 为 '${id}' 的菜单不存在`, 404);

    try {
      menu = await this.menuRepository.save<MenuEntity>(
        this.menuRepository.merge(existing, {
          parentId,
          router,
          perms,
          icon,
          sort,
          viewPath,
          keepalive,
        }),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('菜单 已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return success('修改菜单成功', menu);
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
