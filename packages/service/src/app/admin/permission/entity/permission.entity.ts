import { BaseEntity } from '@/app/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'permission',
})
export class PermissionEntity extends BaseEntity {
  @Column('varchar', { length: 50, comment: '权限名称' })
  name: string;

  @Column('varchar', { length: 50, comment: '权限编号', unique: true })
  code: string;

  @Column('varchar', { length: 50, comment: '地址' })
  url: string;

  @Column('bigint', {
    unsigned: true,
    nullable: true,
  })
  categoryId: number;

  @Column('varchar', { length: 255, comment: '备注', nullable: true })
  remark: string;

  //   @ManyToOne(() => PermissionEntity, (perm) => perm.category)
  //   category?: PermissionEntity | undefined;
}
