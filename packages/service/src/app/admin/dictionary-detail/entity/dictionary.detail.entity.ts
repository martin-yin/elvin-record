import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/entity/base.entity';
import { DictionaryEntity } from '../../dictionary/entity/dictionary.entity';

@Entity()
export class DictionaryDetail extends BaseEntity {
  @Column()
  label: string;

  @Column()
  value: string;

  @Column()
  sort: number;

  @ManyToOne(
    () => DictionaryEntity,
    (Dictionary) => Dictionary.dictionaryDetail,
  )
  dictionary: DictionaryEntity;
}
