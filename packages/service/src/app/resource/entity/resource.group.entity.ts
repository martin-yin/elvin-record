import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ResourceEntity } from './resource.entity';

export enum ResourceGroupTypeEnum {
  OTHER = 0, // 其他资源
  IMAGE = 10, // 图片资源
}

@Entity({
  name: 'resource-group',
})
export class ResourceGroupEntity extends BaseEntity {
  @Column('tinyint', {
    comment: '分组类型,0其他资源,10图片资源,默认0',
    unsigned: true,
    default: ResourceGroupTypeEnum.OTHER,
  })
  type: ResourceGroupTypeEnum;

  @Column('varchar', { comment: '分组名称', length: 50 })
  name: string;

  @Column('int', {
    comment: '分组顺序',
    unsigned: true,
    nullable: true,
    default: 100,
  })
  order: number;

  @OneToMany(() => ResourceEntity, (resource) => resource.group)
  // @JoinColumn()
  resources?: ResourceEntity[] | undefined;
}
