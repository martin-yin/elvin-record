import type { PackFn } from 'rrweb/typings/packer/base';
import type { eventWithTime, recordOptions } from 'rrweb/typings/types';

export abstract class BaseElvinRecord {
  abstract getRecordStatus(): RecordStatus;
  abstract getRecordEventList(): eventWithTime[];

  abstract startRecord(recordEventList: eventWithTime[]): void;
  abstract stopRecord(): void;
}

export type ElvinRecordOptionsType = Omit<recordOptions<any>, 'checkoutEveryNth' | 'checkoutEveryNms' | 'plugins'> & {
  packFn?: boolean | PackFn;
  unloadRecord: boolean;
};

export enum RecordStatus {
  'done',
  'recording'
}
