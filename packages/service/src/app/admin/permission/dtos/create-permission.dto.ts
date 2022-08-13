import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: '名称必须是字符串' })
  @IsNotEmpty({ message: '名称不能为空' })
  readonly name: string;

  @IsString({ message: 'code 必须是字符串' })
  @IsNotEmpty({ message: 'code不能为空' })
  readonly code: string;

  @IsString({ message: 'url必须是字符串' })
  @IsNotEmpty({ message: 'url不能为空' })
  readonly url: string;

  readonly remark: string;

  readonly categoryId: number;

  readonly status: number;
}
