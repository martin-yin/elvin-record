import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'api',
})
export class ApiEntity extends BaseEntity {
  @Column('varchar', { length: 50, comment: '权限名称' })
  name: string;

  @Column('varchar', { length: 50, comment: '权限编号', unique: true })
  code: string;

  @Column('varchar', { length: 50, comment: '请求方式' })
  method: string;

  @Column('varchar', { length: 50, comment: '地址' })
  url: string;

  @Column()
  type: string;

  @Column('varchar', { comment: 'api 分组' })
  group: string;
}
