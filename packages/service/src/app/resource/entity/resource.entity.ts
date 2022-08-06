import { BaseEntity } from '@/common/database/entity/base.entity';
import { Column, Entity, Index, ManyToOne, DeepPartial } from 'typeorm';
import { ResourceGroupEntity } from './resource.group.entity';

export enum ResourceStorageEnum {
  OTHER = 0, // 其他
  QINIU = 10, // 七牛云
}

export enum ResourceTypeEnum {
  OTHER = 0, // 其他
  IMAGE = 10, // 图片
}

export type ResourceEntityDataType = DeepPartial<ResourceEntity>;

@Entity()
export class ResourceEntity extends BaseEntity {
  @Column('tinyint', {
    comment: '存储对象,0其他,10七牛云,默认0',
    unsigned: true,
    default: ResourceStorageEnum.OTHER,
  })
  storage: ResourceStorageEnum;
  @Column('varchar', { comment: '文件远程地址', length: 500 })
  url: string;

  @Column('varchar', { comment: '文件名称', length: 200 })
  name: string;

  @Index({ unique: true })
  @Column('varchar', { comment: '文件唯一标识', length: 200, select: false })
  uuid: string;

  @Column('int', { comment: '文件大小', unsigned: true, nullable: true })
  size: number;

  @Column('tinyint', {
    comment: '文件类型,0其他,10图片,默认0',
    unsigned: true,
    default: ResourceTypeEnum.OTHER,
    select: false,
  })
  type: ResourceTypeEnum;

  @Column('varchar', { comment: '文件后缀', length: 20 })
  extension: string;

  // @Column('bigint', {
  //   unsigned: true,
  //   nullable: true,
  //   comment: '资源分组',
  // })
  // groupId: number;

  @ManyToOne(() => ResourceGroupEntity)
  // @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: ResourceGroupEntity;
}
