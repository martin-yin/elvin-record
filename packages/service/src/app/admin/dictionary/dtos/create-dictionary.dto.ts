import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDictionaryDto {
  @IsNotEmpty({
    message: '字典名称是必不可少的',
  })
  @IsString({ message: '字典名称必须是字符串' })
  readonly name: string;

  readonly type: string;

  readonly desc: string;
}
