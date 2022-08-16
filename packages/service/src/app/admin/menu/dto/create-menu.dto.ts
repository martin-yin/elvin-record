import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateMenuDto {
  @IsString({ message: '归属应用必须是一个字符串' })
  @IsNotEmpty({ message: '归属应用不能为空' })
  readonly application: string;

  @IsString({ message: '菜单名称必须是一个字符串' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  readonly name: string;

  @IsString({ message: '菜单编号必须是一个字符串' })
  @IsNotEmpty({ message: '菜单编号不能为空' })
  readonly code: string;

  readonly parentId?: number;

  @IsNotEmpty({ message: '菜单类型不能为空' })
  readonly type: number;

  readonly router: string;
  readonly routerName: string;
  readonly component: string;
  readonly redirect: string;
  readonly icon: string;
  readonly openType: string;
  readonly link: string;
  readonly sort: number;
  readonly visible: boolean;
  readonly permission: string;
  readonly authorizedApis: string;
}
