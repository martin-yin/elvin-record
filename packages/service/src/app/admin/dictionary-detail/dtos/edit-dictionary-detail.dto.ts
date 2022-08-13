import { IsNumber } from 'class-validator';
import { CreateDictionaryDetailDto } from './create-dictionary-detail.dto';

export class EditDictionaryDetailDto extends CreateDictionaryDetailDto {
  @IsNumber()
  readonly id: number;
}
