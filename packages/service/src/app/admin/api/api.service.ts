import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiEntity } from './entity/api.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(ApiEntity)
    private readonly apiRepository: Repository<ApiEntity>,
  ) {}
}
