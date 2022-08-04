import { record } from 'rrweb';
import type { eventWithTime } from 'rrweb/typings/types';
import { ActionRecordStatus } from '../../interface';

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
  recordEventData
}: {
  unloadRecord: boolean;
  recordEventData: {
    eventList: eventWithTime[];
    status: ActionRecordStatus;
  };
}) {
  window.addEventListener('click', domClickListener, true);

  if (unloadRecord) {
    // 当页面关闭的时候将已经录制的数据存储起来
    window.addEventListener(
      'unload',
      () => {
        const { eventList, status } = recordEventData;

        if (status === ActionRecordStatus.recording) {
          record.addCustomEvent('unload', {
            event: 'unload'
          });
          localStorage.setItem('recordEventList', JSON.stringify(eventList));
        }
      },
      true
    );
  }
}

export function removeEventListeners() {
  window.removeEventListener('click', domClickListener, true);
}
