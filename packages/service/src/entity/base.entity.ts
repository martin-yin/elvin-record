import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @Column()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  //   @CreateUserColumn()
  //   @Column({ type: 'bigint', unsigned: true, transformer: idTransformer })
  //   createdById?: number;

  //   @UpdateUserColumn()
  //   @Column({
  //     type: 'bigint',
  //     unsigned: true,
  //     nullable: true,
  //     transformer: idTransformer,
  //   })
  //   updatedById?: number;

  //   @SoftDeleteColumn(IsDeleteEnum.TRUE)
  //   @Column({ type: 'tinyint', unsigned: true, default: IsDeleteEnum.FALSE })
  //   isDelete?: IsDeleteEnum;

  //   @Column({ type: 'tinyint', unsigned: true, default: IsDeleteEnum.FALSE })
  //   isDelete?: IsDeleteEnum;
}
