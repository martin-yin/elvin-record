import { BaseEntity } from '@/app/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'source-map',
})
export class SourceMapEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  monitorId: string;

  @Column()
  release: string;

  @Column()
  path: string;

  @Column({
    default: 0,
  })
  size: number;
}
