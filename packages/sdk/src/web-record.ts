import { record } from 'rrweb';
import type { eventWithTime, recordOptions } from 'rrweb/typings/types';
import { xhrRecord } from './xhr';

type WebActionsRecordOptions = Omit<recordOptions<any>, 'checkoutEveryNth' | 'checkoutEveryNms' | 'plugins'>;

/**
 * 监听dom 点击事件
 * @param event
 */

const domClickListener = (event: any) => {
  record.addCustomEvent('dom-click', {
    event: event,
    text: event.path[0].innerHTML
  });
};

export class WebActionsRecord {
  options: WebActionsRecordOptions | undefined;
  constructor(options?: WebActionsRecordOptions) {
    this.options = options;
  }
  private webRecord: any;
  public recordEventList: eventWithTime[] = [];

  public startRecord() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    window.addEventListener('click', domClickListener, true);
    xhrRecord();
    const { options } = this;

    this.webRecord = record({
      emit(event) {
        that.recordEventList.push(event);
      },
      sampling: {
        mousemove: false
      }
    });
  }

  public stopRecord() {
    if (this.webRecord) {
      setTimeout(() => {
        window.removeEventListener('click', domClickListener, true);

        this.webRecord();
        this.recordEventList = [];
      });
    }
  }
}
