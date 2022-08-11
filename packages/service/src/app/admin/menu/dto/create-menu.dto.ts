import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNumber({}, { message: '父节点必须是一个数字' })
  @IsOptional()
  readonly parentId: number;

  @IsString({ message: '节点名称必须是一个字符串' })
  @IsNotEmpty({ message: '节点名称不能为空' })
  readonly name: string;

  @IsString({ message: '节点路由必须是一个字符串' })
  @IsNotEmpty({ message: '节点路由不能为空' })
  readonly router: string;

  readonly perms: string;
  readonly icon: string;
  readonly sort: number;
  @IsString({ message: '文件路径必须是一个字符串' })
  @IsNotEmpty({ message: '文件路径不能为空' })
  readonly viewPath: string;
  readonly keepalive: boolean;
}
