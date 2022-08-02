import { pack, record } from 'rrweb';
import type { eventWithTime } from 'rrweb/typings/types';
import type { ElvinRecordOptionsType } from '../../interface';
import { BaseElvinRecord, RecordStatus } from '../../interface';
import { addEventListeners, removeEventListeners } from './event';
import { xhrEventRecord } from './xhr';

/**
 * 如果本地存在录制的数据那么就继续录制
 * @param startRecord
 */
function continueRecord(startRecord: BaseElvinRecord['startRecord']) {
  const recordEventList = localStorage.getItem('recordEventList');

  if (recordEventList) {
    // 如果录制状态还没有结束的话，那么就继续录制
    try {
      console.log('根据录制状态，录制还未完成，现在开始继续录制');
      startRecord(JSON.parse(recordEventList));
    } catch (e) {
      // 解析json失败
      console.log('解析json数据失败，请从新开始录制');
      console.log(`失败原因：`, e);
    }
  }
}

export class ElvinRecord extends BaseElvinRecord {
  private options: ElvinRecordOptionsType = {
    unloadRecord: false
  };
  private webRecord: any;
  private recordEventList: eventWithTime[] = [];
  private recordStatus: RecordStatus = RecordStatus.done;

  constructor(options?: ElvinRecordOptionsType) {
    super();
    if (options) {
      this.options = options;
      // 判断数据是否需要压缩的
      if (options?.packFn) {
        this.options.packFn = pack;
      }
    }

    const { unloadRecord } = this.options;

    // 初始化监听
    addEventListeners({
      unloadRecord,
      getRecordStatus: this.getRecordStatus,
      getRecordEventList: this.getRecordEventList
    });
    // 用于判断刷新页面后是否直接开始录制
    if (this.options.unloadRecord) {
      continueRecord(this.startRecord);
    }

    // 重写 xhr 原型
    xhrEventRecord('');
  }

  /**
   * 获取当前的录制状态
   * @returns
   */
  public getRecordStatus(): RecordStatus {
    return this.recordStatus;
  }

  /**
   * 获取录制的数据
   * @returns
   */
  public getRecordEventList(): eventWithTime[] {
    return this.recordEventList;
  }

  public startRecord(recordEventList: eventWithTime[] = []) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this.recordStatus = RecordStatus.recording;
    this.recordEventList = recordEventList;
    this.webRecord = record({
      emit(event) {
        that.recordEventList.push(event);
      },
      sampling: {
        mousemove: false
      }
    });
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
    this.recordStatus = RecordStatus.done;
    this.recordEventList = [];
  }
}
