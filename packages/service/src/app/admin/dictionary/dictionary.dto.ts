export class CreateDictionaryDto {
  name: string;
  type: string;
  desc: string;
}

export class GetDictionaryDto {
  name?: string;
  type?: string;
  desc?: string;
  pageSize: number;
  pageIndex: number;
}

export class UpdateDictionaryDto {
  name: string;
  type: string;
  desc: string;
}
