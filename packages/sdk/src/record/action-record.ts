import { pack, record } from 'rrweb';
import type { eventWithTime } from 'rrweb/typings/types';
import { addEventListeners, removeEventListeners } from './event';
import type { ActionRecordOptionsType } from '../interface';
import { BaseActionRecord, ActionRecordStatus } from '../interface';
import { xhrEventRecord } from './xhr';

export let recordEventData: {
  eventList: eventWithTime[];
  status: ActionRecordStatus;
} = {
  eventList: [],
  status: ActionRecordStatus.done
};

/**
 * 如果本地存在录制的数据那么就继续录制
 */
function continueRecord() {
  const localRecordEventData = localStorage.getItem('recordEventData');

  if (localRecordEventData) {
    // 如果录制状态还没有结束的话，那么就继续录制
    try {
      console.log('根据录制状态，录制还未完成，现在开始继续录制');
      recordEventData = JSON.parse(localRecordEventData);

      return recordEventData;
    } catch (e) {
      // 解析json失败
      console.log('解析json数据失败，请从新开始录制');
      console.log(`失败原因：`, e);
    }
  }
}

export class ActionRecord extends BaseActionRecord {
  private options: ActionRecordOptionsType = {
    unloadRecord: false
  };
  private webRecord: any;

  constructor(options?: ActionRecordOptionsType) {
    super();
    if (options) {
      this.options = options;
      // 判断数据是否需要压缩的
      if (options?.packFn) {
        this.options.packFn = pack;
      }
    }

    // 用于判断刷新页面后是否直接开始录制
    if (this.options.unloadRecord) {
      continueRecord();
      this.startRecord();
    }
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

    this.webRecord = record({
      emit(event) {
        recordEventData.eventList.push(event);
      },
      sampling: {
        mousemove: false
      }
    });
    const { unloadRecord } = this.options;

    recordEventData.status = ActionRecordStatus.recording;
    // 初始化监听
    addEventListeners({
      unloadRecord,
      recordEventData
    });
    // xhr 监听
    xhrEventRecord('');
  }

  /**
   * 停止录制
   */
  public stopRecord() {
    if (this.webRecord) {
      this.clear();
    }
  }

  /**
   * 清理
   */
  private clear() {
    this.webRecord();
    removeEventListeners();
    recordEventData = {
      eventList: [],
      status: ActionRecordStatus.done
    };
    localStorage.removeItem('recordEventList');
  }
}
