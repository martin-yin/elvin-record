import * as rrweb from 'rrweb';
import type { eventWithTime } from 'rrweb/typings/types';
import { addEventListeners } from './event';
import axios from 'axios';
import { ActionRecordStatus, BaseActionRecord } from '../interface';
import { xhrEventRecord } from './xhr';

export let recordEventData: {
  eventList: eventWithTime[];
  status: ActionRecordStatus;
} = {
  eventList: [],
  status: ActionRecordStatus.done
};

export class ActionRecord extends BaseActionRecord {
  private webRecord: any;

  constructor() {
    super();
  }

  /**
   * 获取当前的录制状态
   * @returns
   */
  public getRecordStatus(): ActionRecordStatus {
    return recordEventData.status;
  }

  /**
   * 获取录制的数据
   * @returns
   */
  public getRecordEventList(): eventWithTime[] {
    return recordEventData.eventList;
  }

  /**
   * 开始录制
   * @returns
   */
  public startRecord() {
    if (recordEventData.status === ActionRecordStatus.recording) {
      console.warn('正在录制中，请勿重复点击');

      return;
    }

    console.log(rrweb, 'rrweb.pack');
    this.webRecord = rrweb.record({
      emit(event) {
        recordEventData.eventList.push(event);
      },
      packFn: rrweb.pack
    });

    recordEventData.status = ActionRecordStatus.recording;
    // 初始化监听
    addEventListeners();
    // xhr 监听
    xhrEventRecord('');

    return recordEventData.status;
  }

  /**
   * 停止录制
   */
  public stopRecord() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    if (this.webRecord) {
      axios
        .post(
          'http://127.0.0.1:3000/api/record-event',
          {
            recordEventList: recordEventData.eventList
          },
          {
            headers: {
              ['Authorization']: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(res => {});

      that.clear();

      return recordEventData.status;
    }
  }

  /**
   * 清理
   */
  private clear() {
    this.webRecord();
    console.log(1111111111);
    recordEventData = {
      eventList: [],
      status: ActionRecordStatus.done
    };
    localStorage.removeItem('recordEventList');
  }
}
