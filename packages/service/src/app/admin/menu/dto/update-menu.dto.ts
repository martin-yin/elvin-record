import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMenuDto } from './create-menu.dto';

export class EditMenuDto extends CreateMenuDto {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
