import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNumber({}, { message: '父节点必须是一个数字' })
  @IsOptional()
  readonly parentId: number;

  @IsString({ message: '菜单名称必须是一个字符串' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  readonly name: string;

  @IsString({ message: '菜单路由必须是一个字符串' })
  @IsNotEmpty({ message: '菜单路由不能为空' })
  readonly router: string;

  @IsString({ message: '文件路径必须是一个字符串' })
  @IsNotEmpty({ message: '文件路径不能为空' })
  readonly viewPath: string;
  readonly perms: string;
  readonly icon: string;
  readonly sort: number;
  readonly keepalive: boolean;
}
