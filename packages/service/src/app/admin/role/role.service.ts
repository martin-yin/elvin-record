import { ApiException } from '@/app/core/exceptions';
import { Result } from '@/app/core/interfaces';
import { DataBaseService } from '@/app/core/services';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveRoleMenusDto, SaveRolePermissionListDto } from './dtos';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';
import { RolePermissionEntity } from './entity/role.permission.entity';

@Injectable()
export class RoleService extends DataBaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,

    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {
    super(roleRepository);
  }

  /**
   * 绑定角色菜单
   * @param saveRoleMenusDto
   * @returns
   */
  async saveRoleMenus({ id, menuIds }: SaveRoleMenusDto): Promise<Result> {
    const roleMenus: Partial<RoleMenuEntity>[] = menuIds
      .split(',')
      .map((menuId) => {
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
  async saveRolePermissionList({
    id,
    permissionList,
  }: SaveRolePermissionListDto): Promise<Result> {
    const permissionListIds = permissionList.split(',');
    const rolePermissionList: Partial<RolePermissionEntity>[] =
      permissionListIds.map((permissionListId) => {
        return {
          roleId: id,
          apiId: +permissionListId,
        };
      });

    await this.rolePermissionRepository.save<RolePermissionEntity>(
      this.rolePermissionRepository.create(rolePermissionList),
    );

    return success('授权成功');
  }

  /**
   * 获取用户Id 获取角色的许可
   * @param roleId
   */
  async getRolePermissionList(roleId: number): Promise<string[]> {
    // 查询用户的角色

    const menuIds = await this.rolePermissionRepository.query(
      `select menuId  as id from ` + '`role-menu`' + `where roleId = ${roleId}`,
    );
    if (menuIds.length === 0) {
      return [];
    }

    const newMenuIds = menuIds.map((menu) => menu.id).join(',');
    const authorizedApis = await this.rolePermissionRepository.query(
      `select authorized_apis as ids from menu where id in (${newMenuIds})`,
    );

    const apiIds = [];

    authorizedApis.forEach((authorizedApi) => {
      if (authorizedApi.ids !== '') {
        apiIds.push(...authorizedApi.ids.split(','));
      }
    });
    const authorizedCode = await this.rolePermissionRepository.query(
      `SELECT name, code from api WHERE id in (${apiIds})`,
    );

    console.log(authorizedCode, 'authorizedCode');

    return authorizedCode.map((item) => item.code);
  }

  /**
   * 根据roleId 获取到当前角色的可访问 API
   * @param id
   * @returns
   */
  async getRoleMenuList(id: number): Promise<Result> {
    const apiIds = await this.rolePermissionRepository.query(
      `select apiId  as id from ` + '`role-api`' + `where roleId = ${id}`,
    );
    return await this.rolePermissionRepository.query(
      `SELECT path, method from api WHERE id in (${apiIds.map(
        (api) => api.id,
      )})`,
    );
  }

  /**
   * 获取所有角色
   */
  async getAll(): Promise<Result> {
    const menuList = await this.roleRepository.find();
    if (menuList) return success('获取所有角色成功', menuList);
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
