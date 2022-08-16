import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'menu',
})
export class MenuEntity extends BaseEntity {
  // application: "system"
  // code: "system_index"
  // component: "LAYOUT"
  // icon: "ant-design:home-outlined"
  // id: "1"
  // name: "主控面板"
  // openType: 0
  // pid: 0
  // router: "/"
  // sort: 0
  // status: 0
  // type: 0
  // visible: "Y"
  // weight: 1

  @Column({
    comment: '归属应用',
  })
  application: string;

  @Column({
    comment: '菜单编号',
  })
  code: string;

  @Column({
    comment: '菜单名称',
  })
  name: string;

  @Column({ name: 'parent_id', nullable: true, comment: '上级菜单id' })
  parentId: number;

  @Column({ comment: '路由地址' })
  router: string;

  @Column({ comment: '路由名称' })
  routerName: string;

  @Column({ nullable: true, comment: '前端组件' })
  component: string;

  @Column({ comment: '默认跳转地址' })
  redirect: string;

  @Column({ nullable: true, default: '', comment: '菜单图标' })
  icon: string;

  @Column({ default: '', comment: '打开方式' })
  openType: string;

  @Column({ default: '', comment: '内外链地址' })
  link: string;

  @Column({ type: 'int', default: 0, nullable: true })
  sort: number;

  @Column({ type: 'boolean', default: false, comment: '是否显示' })
  visible: boolean;

  @Column({ type: 'varchar', default: '', comment: '权限标识' })
  permission: string;

  @Column({ type: 'varchar', default: '', comment: '接口ids' })
  authorizedApi: string;
}
