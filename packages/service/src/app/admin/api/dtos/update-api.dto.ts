import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class EditApiDto {
  @IsString({ message: 'id必须是一个字符串' })
  readonly id: number;

  @IsNumber({}, { message: '地址必须是一个字符串' })
  @IsOptional()
  readonly path: string;

  @IsString({ message: '请求方式必须是一个字符串' })
  @IsNotEmpty({ message: '请求方式不能为空' })
  readonly method: string;

  @IsString({ message: 'api分组 必须是一个字符串' })
  @IsNotEmpty({ message: 'api分组 不能为空' })
  readonly apiGroup: string;

  readonly description: string;
}
