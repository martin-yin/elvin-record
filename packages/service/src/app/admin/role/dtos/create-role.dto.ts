export class CreateRoleDto {
  readonly name: string;
}

export class SaveRoleMenusDto {
  readonly id: number;
  readonly menuIds: string;
}

export class SaveRolePermissionListDto {
  readonly id: number;
  readonly permissionList: string;
}
