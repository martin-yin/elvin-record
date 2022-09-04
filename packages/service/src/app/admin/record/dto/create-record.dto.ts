export type RecordEventType = {
  data: {
    tag: string;
    [k: string]: any;
  };
  timestamp: number;
  type: number;
};

export class CreateRecordList {
  recordList: Array<string>;
  ua: string;
}
