import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateApiDto } from './create-api.dto';

export class EditApiDto extends CreateApiDto {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
