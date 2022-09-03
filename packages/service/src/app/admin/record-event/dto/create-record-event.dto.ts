export type RecordEventItemType = {
  data: {
    tag: string;
    [k: string]: any;
  };
  timestamp: number;
  type: number;
};

export class CreateRecordEvent {
  recordEventList: RecordEventItemType[];
}
