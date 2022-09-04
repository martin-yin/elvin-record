import { DataBaseService } from '@/app/core/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import { RecordEventType } from './dto/create-record.dto';
import { RecordEventEntity } from './entity/record-event.entity';
import { RecordEntity } from './entity/record.entity';

const rrweb = require('rrweb');
@Injectable()
export class RecordService extends DataBaseService<RecordEntity> {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,

    @InjectRepository(RecordEventEntity)
    private readonly recordEventEntityRepository: Repository<RecordEventEntity>,
  ) {
    super(recordRepository);
  }

  async getAll() {
    return await this.recordRepository.find();
  }

  async getRecordDetail(id: number) {
    return {
      record: await this.findOne(id),
      recordEventList: await this.recordEventEntityRepository.find({
        where: {
          recordId: id,
        },
      }),
    };
  }

  async create(recordList: Array<string>, ua: string, userId = 1) {
    const recordEventList = [];
    const { browser, os, device } = new UAParser(ua).getResult();

    let href = '';
    // 解析后的数据
    const unRecordList: RecordEventType[] = recordList.map(
      (recordEvent: string) => {
        const unRecord: RecordEventType = rrweb.unpack(recordEvent);
        if (href === '' && unRecord.type === 4) {
          href = unRecord.data.href;
        }
        return unRecord;
      },
    );
    const record = await this.recordRepository.save(
      this.recordRepository.create({
        userId,
        href,
        size: unRecordList.length,
        appid: '',
        recordList: JSON.stringify(unRecordList),
        os: os.name,
        osVersion: os.version,
        browser: browser.name,
        browserVersion: browser.version,
        device: device.vendor,
        deviceModel: device.model,
        deviceType: device.type,
        ua,
      }),
    );

    unRecordList.forEach((unRecord) => {
      if (unRecord.type === 4 || unRecord.type === 5) {
        recordEventList.push(
          this.recordEventEntityRepository.create({
            recordId: record.id,
            payload: JSON.stringify(unRecord.data.payload),
          }),
        );
      }
    });

    return await this.recordEventEntityRepository.save(recordEventList);
  }
}
