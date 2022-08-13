import { IsNumber } from 'class-validator';
import { CreateDictionaryDto } from './create-dictionary.dto';

export class EditDictionaryDto extends CreateDictionaryDto {
  @IsNumber()
  readonly id: number;
}
