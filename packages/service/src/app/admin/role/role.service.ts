import { ApiException } from '@/common/exceptions';
import { success } from '@/common/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, SaveRoleApisDto, SaveRoleMenusDto } from './dtos';
import { RoleApiEntity } from './entity/role.api.entity';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,

    @InjectRepository(RoleApiEntity)
    private readonly roleApiRepository: Repository<RoleApiEntity>,
  ) {}

  /**
   * 创建用户
   * @param createRoleDto 用户信息
   */
  async create(createRoleDto: CreateRoleDto): Promise<Partial<RoleEntity>> {
    const role: Partial<RoleEntity> =
      await this.roleRepository.save<RoleEntity>(
        this.roleRepository.create(createRoleDto),
      );

    return role;
  }

  /**
   * 绑定角色菜单
   * @param saveRoleMenusDto
   * @returns
   */
  async saveRoleMenus({ id, menus }: SaveRoleMenusDto) {
    const menusId = menus.split(',');
    const roleMenus: Partial<RoleMenuEntity>[] = menusId.map((menuId) => {
      return {
        roleId: id,
        menuId: +menuId,
      };
    });

    await this.roleMenuRepository.save<RoleMenuEntity>(
      this.roleMenuRepository.create(roleMenus),
    );

    return success('授权成功');
  }

  /**
   * 绑定角色API
   * @param saveRoleMenusDto
   * @returns
   */
  async saveRoleApis({ id, apis }: SaveRoleApisDto) {
    const apiIds = apis.split(',');
    const roleApis: Partial<RoleApiEntity>[] = apiIds.map((apiId) => {
      return {
        roleId: id,
        apiId: +apiId,
      };
    });

    console.log(roleApis, 'roleApis');
    await this.roleApiRepository.save<RoleApiEntity>(
      this.roleApiRepository.create(roleApis),
    );

    return success('授权成功');
  }
  /**
   * 获取角色权限
   * @param id
   */
  async getRoleDetail(id: number) {
    const menus = this.roleMenuRepository.findBy({ roleId: id });
    const api = this.roleApiRepository.findBy({ roleId: id });
  }

  /**
   * 删除角色
   *
   * @param id 角色ID
   */
  async remove(id: number): Promise<void> {
    const existing = await this.roleRepository.findOneBy({ id });
    if (!existing)
      throw new ApiException(`删除失败，ID 为 '${id}' 的角色不存在`, 404);
    await this.roleRepository.remove(existing);
  }
}
