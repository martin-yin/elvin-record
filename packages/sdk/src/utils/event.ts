import { record } from 'rrweb';
import type { BaseElvinRecord } from '../interface';
import { RecordStatus } from '../interface';

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

/**
 *
 * @param param
 */
export function addEventListeners({
  unloadRecord,
  getRecordStatus,
  getRecordEventList
}: {
  unloadRecord: boolean;
  getRecordStatus: BaseElvinRecord['getRecordStatus'];
  getRecordEventList: BaseElvinRecord['getRecordEventList'];
}) {
  window.addEventListener('click', domClickListener, true);

  if (unloadRecord) {
    // 当页面关闭的时候将已经录制的数据存储起来
    window.addEventListener(
      'unload',
      () => {
        if (getRecordStatus() === RecordStatus.recording) {
          localStorage.setItem('recordEventList', JSON.stringify(getRecordEventList()));
        }
      },
      true
    );
  }
}

export function removeEventListeners() {
  window.removeEventListener('click', domClickListener, true);
}
