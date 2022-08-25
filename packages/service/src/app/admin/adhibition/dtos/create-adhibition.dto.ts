import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdhibitionDto {
  @IsString({ message: '应用名称必须是字符串' })
  @IsNotEmpty({ message: '应用名称不能为空' })
  readonly name: string;
  @IsString({ message: '唯一编码必须是字符串' })
  @IsNotEmpty({ message: '唯一编码不能为空' })
  readonly icon: string;
  @IsString({ message: '图标必须是字符串' })
  @IsNotEmpty({ message: '图标不能为空' })
  readonly code: string;
}
