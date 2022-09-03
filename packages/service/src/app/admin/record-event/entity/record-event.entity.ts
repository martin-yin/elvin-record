import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'record_event',
})
export class RecordEventEntity extends BaseEntity {
  @Column({
    comment: '页面url',
  })
  href: string;

  @Column({
    name: 'record_event_list',
    comment: '录制事件',
    type: 'longtext',
  })
  recordEventList: string;

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
}
