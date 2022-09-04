import * as rrweb from 'rrweb';
import { addEventListeners } from './event';
import axios from 'axios';
import { ActionRecordStatus, BaseActionRecord } from '../interface';
import { xhrEventRecord } from './xhr';
import { getPackEvent } from '../utils/baseInfo';

export let recordEventData: {
  eventList: string[];
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
  public getRecordEventList(): string[] {
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

    this.webRecord = rrweb.record({
      emit(event) {
        recordEventData.eventList.push(getPackEvent(event));
      }
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
      // 抓取基础信息
      axios
        .post(
          'http://127.0.0.1:3000/api/record',
          {
            recordList: recordEventData.eventList,
            ua: navigator.userAgent
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

    recordEventData = {
      eventList: [],
      status: ActionRecordStatus.done
    };
    localStorage.removeItem('recordEventList');
  }
}
