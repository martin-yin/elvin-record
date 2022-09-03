import { DataBaseService } from '@/app/core/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordEvent } from './dto/create-record-event.dto';
import { RecordEventEntity } from './entity/record-event.entity';

@Injectable()
export class RecordEventService extends DataBaseService<RecordEventEntity> {
  constructor(
    @InjectRepository(RecordEventEntity)
    private readonly recordEventRepository: Repository<RecordEventEntity>,
  ) {
    super(recordEventRepository);
  }

  async getAll() {
    return await this.recordEventRepository.find();
  }

  async create({ recordEventList }: CreateRecordEvent) {
    // const startEvent = recordEventList.find(
    //   (item) => item.type === 4 && item.data.href,
    // );
    const userId = 1;

    return await this.recordEventRepository.save(
      this.recordEventRepository.create({
        userId,
        href: '',
        size: recordEventList.length,
        appid: '',
        recordEventList: JSON.stringify(recordEventList),
      }),
    );
  }
}
