import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  ResourceStorageEnum,
  ResourceTypeEnum,
} from './entity/resource.entity';

export class CreateUploadFileGroupDto {
  @IsEmpty()
  name: string;
  @IsNumber()
  parentId: number;
  @IsNumber()
  sort: number;
}

export class ResourceGroupIdDTO {
  @Type(() => Number)
  @IsInt({ message: '分组id必须为数字类型' })
  id: number;
}

export class ResourceListDTO {
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: '分组id必须为数字类型' })
  groupId?: number;

  @Type(() => Number)
  @IsInt({ message: '当前页码必须为数字类型' })
  @Min(1, { message: '当前页码不能少于1' })
  pageIndex = 1;

  @Type(() => Number)
  @IsInt({ message: '每页数量必须为数字类型' })
  @Max(200, { message: '每页数量不能超过200条' })
  pageSize = 15;
}

export class FileInfoDTO {
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ResourceStorageEnum)
  storage: ResourceStorageEnum = ResourceStorageEnum.QINIU;

  @MaxLength(500, { message: '文件远程地址长度不能超过500' })
  url: string;

  @MaxLength(500, { message: '文件名称长度不能超过500' })
  name: string;

  @MaxLength(50, { message: '文件唯一标识长度不能超过50' })
  uuid: string;

  @Type(() => Number)
  @IsInt({ message: '文件大小必须为数字类型' })
  size: number;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(ResourceTypeEnum)
  type: ResourceTypeEnum = ResourceTypeEnum.OTHER;

  @MaxLength(500, { message: '文件后缀长度不能超过500' })
  extension: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '资源分组id必须为数字类型' })
  group: number;
}

export class UploadFilesDTO {
  @Type(() => FileInfoDTO)
  @ValidateNested()
  files: FileInfoDTO[];
}
