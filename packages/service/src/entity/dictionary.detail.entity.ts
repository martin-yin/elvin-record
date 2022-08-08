import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Dictionary } from './dictionary.entity';

@Entity()
export class DictionaryDetail extends BaseEntity {
  @Column()
  label: string;

  @Column()
  value: string;

  @Column()
  sort: number;

  @ManyToOne(() => Dictionary, (Dictionary) => Dictionary.dictionaryDetail)
  dictionary: Dictionary;
}
