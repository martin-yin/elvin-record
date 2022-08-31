import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSourceMapDto {
  @IsNotEmpty({
    message: '文件名不能为空',
  })
  @IsString({ message: '文件名必须是字符串' })
  name: string;

  @IsNotEmpty({
    message: '版本是必不可少的',
  })
  @IsString({ message: '版本必须是字符串' })
  release: string;

  path: string;
}
