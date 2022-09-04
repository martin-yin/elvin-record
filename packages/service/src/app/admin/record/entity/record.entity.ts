import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'record',
})
export class RecordEntity extends BaseEntity {
  @Column({
    comment: '页面url',
    default: '',
  })
  href: string;

  @Column({
    name: 'record_list',
    comment: '录制事件',
    type: 'longtext',
  })
  recordList: string;

  @Column({
    comment: '录制条数',
  })
  size: number;

  @Column({
    comment: '项目id',
  })
  appid: string;

  @Column({
    comment: '归属于哪个用户',
  })
  userId: number;

  @Column()
  os: string;

  @Column({
    name: 'os_version',
  })
  osVersion: string;

  @Column()
  browser: string;
  @Column({
    name: 'browser_version',
  })
  browserVersion: string;

  @Column()
  device: string;

  @Column({
    name: 'device_model',
  })
  deviceModel: string;

  @Column({
    name: 'device_type',
  })
  deviceType: string;

  @Column()
  ua: string;
}
