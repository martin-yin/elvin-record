import { BaseEntity } from '@/common/database/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MenuEntity extends BaseEntity {
  @Column({ name: 'parent_id', nullable: true, comment: '父节点ID' })
  parentId: number;

  @Column()
  name: string;

  @Column({ nullable: true, comment: '节点路由' })
  router: string;

  @Column({ nullable: true, comment: '权限' })
  perms: string;

  @Column({ type: 'tinyint', default: 0, comment: '菜单类型' })
  type: number;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: 'order_num', type: 'int', default: 0, nullable: true })
  sort: number;

  @Column({ name: 'view_path', nullable: true, comment: '文件路径' })
  viewPath: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  keepalive: boolean;
}