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
   * 添加Api
   * @param createApiDto
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
        throw new ApiException('Api 已经存在', HttpStatus.CONFLICT);
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
        throw new ApiException('Api 已经存在', HttpStatus.CONFLICT);
      throw new ApiException(
        '发生了一些错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return success('修改菜单成功', menu);
  }

  /**
   * 删除用户
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
   * 获取所有用户
   */
  async getAll(): Promise<Result> {
    const users = await this.menuRepository.find();
    if (users) return success('获取所有Api成功', users);
  }

  /**
   * 获取单个APi
   */
  async getOne(id: number): Promise<Result> {
    const user = await this.menuRepository.findOne({ where: { id } });

    if (user) {
      return success('获取Api成功', user);
    } else {
      throw new ApiException(`获取失败，ID 为 '${id}' 的菜单不存在`, 404);
    }
  }
}
