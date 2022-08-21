import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'role',
})
export class RoleEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar' })
  remark: string;

  @Column({ type: 'int' })
  sort: number;

  @Column({ type: 'varchar' })
  code: number;

  // id: '1';
  // isDeleted: '0';
  // name: '超级管理员';
  // remark: '超级管理员';
  // sort: 100;
  // status: 0;
}
