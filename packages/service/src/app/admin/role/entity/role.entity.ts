import { BaseEntity } from '@/app/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'role',
})
export class RoleEntity extends BaseEntity {
  id: number;

  @Column({ unique: true })
  name: string;
}
