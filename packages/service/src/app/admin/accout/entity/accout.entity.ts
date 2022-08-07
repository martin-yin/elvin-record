import { BaseEntity } from '@/common/database/entity/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class AccountEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 32 })
  psalt: string;

  @Column({ name: 'nick_name', nullable: true })
  nickName: string;

  @Column({ name: 'head_img', nullable: true })
  headImg: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  remark: string;
}
