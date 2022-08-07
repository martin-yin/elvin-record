import { BaseEntity } from '@/common/database/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RoleEntity extends BaseEntity {
  id: number;

  @Column({ unique: true })
  name: string;
}
