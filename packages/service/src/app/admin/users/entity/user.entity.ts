import { Entity, Column, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '@/entity/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ default: '', comment: '用户名' })
  username: string;

  @Column({ default: '', unique: true, comment: '邮箱' })
  email: string;

  @Column({ default: '', select: false, comment: '登录密码' })
  password: string;

  @Column({ default: false, name: 'remember_me', comment: '记住我' })
  rememberMe: boolean;

  @Column({ default: '', comment: '头像' })
  avatar: string;

  @Column({
    default: '',
    select: false,
    name: 'refresh_token',
    comment: '刷新token',
  })
  @Exclude()
  refreshToken: string;

  @UpdateDateColumn({ name: 'last_time', type: 'timestamp' })
  lastTime: Date;
}
