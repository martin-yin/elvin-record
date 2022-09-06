import { DataBaseService } from '@/app/core/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import { RecordEventType } from './dto/create-record.dto';
import { RecordEventEntity } from './entity/record-event.entity';
import { RecordEntity } from './entity/record.entity';

function camelCaseKey(o) {
  return _.mapKeys(o, (value, key) => _.camelCase(key));
}

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

  /**
   * 获取录制信息详情
   * @param id
   * @returns
   */
  async getRecordDetail(id: number) {
    const recordDetail = await this.recordRepository.query(
      'SELECT record.*, `record`.`os_version` AS `osVersion`, `user`.`username` AS `username`,  `user`.`avatar` AS `avatar` FROM `record` `record` LEFT JOIN `user` `user` ON `record`.`userId` = `user`.`id`' +
        `where record.id = ${id}`,
    );
    return {
      record: camelCaseKey(recordDetail[0]),
      recordEventList: await this.recordEventEntityRepository.find({
        where: {
          recordId: id,
        },
      }),
    };
  }

  async create(recordList: Array<string>, ua: string, userId: number) {
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

    console.log(new UAParser(ua).getResult(), 'devicedevicedevicedevice');
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
        device: device.vendor || '',
        deviceModel: device.model || '',
        deviceType: device.type || '',
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
