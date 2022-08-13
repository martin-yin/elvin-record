import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../core/entity/base.entity';
import { DictionaryDetail } from '../../dictionary-detail/entity/dictionary.detail.entity';

@Entity('dictionary')
export class DictionaryEntity extends BaseEntity {
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
