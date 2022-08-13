import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class EditPermissionDto extends CreatePermissionDto {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
