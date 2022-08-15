import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'menu',
})
export class MenuEntity extends BaseEntity {
  @Column({
    comment: '菜单名称',
  })
  name: string;

  @Column({ name: 'parent_id', nullable: true, comment: '上级菜单id' })
  parentId: number;

  @Column({ comment: '路由地址 or 访问地址' })
  router: string;

  @Column({ comment: '组件名称' })
  componentName: string;

  @Column({ nullable: true, comment: '组件' })
  component: string;

  @Column({ comment: '默认跳转地址' })
  redirect: string;

  @Column({ nullable: true, default: '', comment: '菜单图标' })
  icon: string;

  @Column({ default: '', comment: '打开方式' })
  internalOrExternal: string;

  @Column({ type: 'int', default: 0, nullable: true })
  sort: number;

  @Column({ type: 'boolean', default: false })
  keepalive: boolean;

  @Column({ type: 'boolean', default: false, comment: '是否显示' })
  visible: boolean;
}
