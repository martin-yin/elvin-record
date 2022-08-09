export class CreateRoleDto {
  readonly name: string;
}

export class SaveRoleMenusDto {
  readonly id: number;
  readonly menus: string;
}

export class SaveRoleApisDto {
  readonly id: number;
  readonly apis: string;
}
