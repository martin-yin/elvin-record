import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DictionaryDetail } from './dictionary.detail.entity';

@Entity()
export class Dictionary extends BaseEntity {
  @Column()
  name: string;
  @Column()
  type: string;
  @Column()
  desc: string;

  @OneToMany(
    () => DictionaryDetail,
    (DictionaryDetail) => DictionaryDetail.dictionary,
  )
  dictionaryDetail: string;
}
