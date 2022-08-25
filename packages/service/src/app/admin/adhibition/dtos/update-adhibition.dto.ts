import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAdhibitionDto } from './create-adhibition.dto';

export class UpdateAdhibitionDto extends CreateAdhibitionDto {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
