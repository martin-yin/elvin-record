import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDictionaryDetailDto {
  @IsNotEmpty({
    message: '字典label是必不可少的',
  })
  @IsString({ message: '字典label名称必须是字符串' })
  label: string;

  @IsNotEmpty({
    message: '字典值是必不可少的',
  })
  @IsString({ message: '字典值必须是字符串' })
  value: string;

  sort: number;

  dictionaryId: number;
}
