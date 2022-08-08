import { BaseEntity } from '@/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'api',
})
export class ApiEntity extends BaseEntity {
  @Column()
  path: string;

  @Column()
  description: string;

  @Column({ name: 'api_group' })
  apiGroup: string;

  @Column()
  method: string;
}
