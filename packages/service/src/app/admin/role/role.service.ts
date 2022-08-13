import { ApiException } from '@/app/core/exceptions';
import { success } from '@/app/core/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, SaveRoleApisDto, SaveRoleMenusDto } from './dtos';
import { RolePermissionEntity } from './entity/role.permission.entity';
import { RoleEntity } from './entity/role.entity';
import { RoleMenuEntity } from './entity/role.menu.entity';
import { Result } from '@/app/core/interfaces';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,

    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
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
    const roleApis: Partial<RolePermissionEntity>[] = apiIds.map((apiId) => {
      return {
        roleId: id,
        apiId: +apiId,
      };
    });

    await this.rolePermissionRepository.save<RolePermissionEntity>(
      this.rolePermissionRepository.create(roleApis),
    );

    return success('授权成功');
  }

  /**
   * 获取用户Id 获取角色的许可
   * @param roleId
   */
  async getRolePermissionList(roleId: number): Promise<string[]> {
    const permissionIds = await this.rolePermissionRepository.query(
      `select permissionId  as id from ` +
        '`role-permission`' +
        `where roleId = ${roleId}`,
    );
    if (permissionIds.length === 0) {
      return [];
    }

    const rolePermissionList = await this.rolePermissionRepository.query(
      `SELECT name, code from permission WHERE id in (${permissionIds.map(
        (permission) => permission.id,
      )})`,
    );

    return rolePermissionList.map((rolePermission) => rolePermission.code);
  }

  /**
   * 根据roleId 获取到当前角色的可访问 API
   * @param id
   * @returns
   */
  async getRoleMenuList(id: number) {
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
