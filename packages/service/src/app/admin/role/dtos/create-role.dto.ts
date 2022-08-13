export class CreateRoleDto {
  readonly name: string;
}

export class SaveRoleMenusDto {
  readonly id: number;
  readonly menus: string;
}

export class SaveRolePermissionListDto {
  readonly id: number;
  readonly permissionList: string;
}
