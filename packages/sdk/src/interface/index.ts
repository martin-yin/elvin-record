import type { PackFn } from 'rrweb/typings/packer/base';
import type { eventWithTime, recordOptions } from 'rrweb/typings/types';

export abstract class BaseActionRecord {
  abstract getRecordStatus(): ActionRecordStatus;
  abstract getRecordEventList(): eventWithTime[];

  abstract startRecord(recordEventList: eventWithTime[]): void;
  abstract stopRecord(): void;
}

export type ActionRecordOptionsType = Omit<recordOptions<any>, 'checkoutEveryNth' | 'checkoutEveryNms' | 'plugins'> & {
  packFn?: boolean | PackFn;
  unloadRecord: boolean;
};

export enum ActionRecordStatus {
  'done',
  'recording'
}

export interface VueInstance {
  config?: VueConfiguration;
  mixin(hooks: { [key: string]: () => void }): void;
  util: {
    warn(...input: any): void;
  };
  version: string;
}

export interface VueConfiguration {
  silent: boolean;
  errorHandler(err: Error, vm: ViewModel, info: string): void;
  warnHandler(msg: string, vm: ViewModel, trace: string): void;
  ignoredElements: (string | RegExp)[];
  keyCodes: { [key: string]: number | number[] };
  async: boolean;
}

export interface ViewModel {
  [key: string]: any;
  $root: Record<string, unknown>;
  $options: {
    [key: string]: any;
    name?: string;
    // vue2.6
    propsData?: any;
    _componentTag?: string;
    __file?: string;
    props?: any;
  };
  $props: Record<string, unknown>;
}
