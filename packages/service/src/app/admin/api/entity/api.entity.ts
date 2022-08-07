import { BaseEntity } from '@/common/database/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
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
