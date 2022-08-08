export class CreateDictionaryDetailDto {
  label: string;
  value: string;
  sort: number;
  dictionaryId: number;
}

export class UpdateDictionaryDetailDto {
  label?: string;
  value?: string;
  sort?: number;
  dictionaryId?: number;
}
