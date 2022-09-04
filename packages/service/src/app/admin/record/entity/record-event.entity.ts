import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'record_event',
})
export class RecordEventEntity extends BaseEntity {
  @Column()
  recordId: number;

  @Column({
    type: 'longtext',
  })
  payload: string;
}
