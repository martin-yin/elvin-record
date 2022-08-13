import { BadRequestException } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface FindWhere {
  readonly [key: string]: string | number | boolean;
}

export abstract class DataBaseService<T> {
  constructor(protected repository: Repository<T>) {}

  async findOne(id: string | number | FindOneOptions<T>): Promise<T> {
    const record = await this.repository.findOne({ where: { id: id } } as any);
    if (!record) {
      throw new BadRequestException(`没有查询到对应数据!`);
    }
    return record;
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const obj = this.repository.create(entity);
    try {
      return await this.repository.save(obj as any);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(
    criteria: string | number,
    softDelete = true,
  ): Promise<DeleteResult | UpdateResult | T> {
    const entity: any = await this.findOne(criteria);
    if (!entity) {
      throw new BadRequestException(`没有查询到对应数据，无法删除!`);
    }
    if (softDelete) {
      entity.is_delete = 0;
      return await this.update(criteria, entity);
    } else {
      return await this.repository.delete(criteria);
    }
  }

  async update(
    id: string | number,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult | T> {
    try {
      return await this.repository.update(id, partialEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
