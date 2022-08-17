import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'menu',
})
export class MenuEntity extends BaseEntity {
  @Column({ default: '', name: 'open_type', comment: '打开方式' })
  openType: string;

  @Column({
    comment: '归属应用',
  })
  application: string;

  @Column({
    comment: '菜单名称',
  })
  name: string;

  @Column({
    comment: '菜单编号',
  })
  code: string;

  @Column({ name: 'parent_id', default: 0, comment: '上级菜单id' })
  parentId: number;

  @Column({ default: 0, name: 'type', comment: '菜单类型' })
  type: number;

  @Column({ comment: '路由地址', default: '' })
  router: string;

  @Column({ comment: '路由名称', default: '' })
  routerName: string;

  @Column({ comment: '前端组件', default: '' })
  component: string;

  @Column({ comment: '默认跳转地址', default: null })
  redirect: string;

  @Column({ default: '', comment: '菜单图标' })
  icon: string;

  @Column({ default: '', comment: '内外链地址' })
  link: string;

  @Column({ type: 'int', default: 0, nullable: true })
  sort: number;

  @Column({ type: 'boolean', default: false, comment: '是否显示' })
  visible: boolean;

  @Column({ type: 'varchar', default: '', comment: '权限标识' })
  permission: string;

  @Column({
    type: 'varchar',
    name: 'authorized_apis',
    default: '',
    comment: '接口ids',
  })
  authorizedApis: string;
}
