import { record } from 'rrweb';
import type { eventWithTime } from 'rrweb/typings/types';
import type { ActionRecordStatus } from '../../interface';

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
export function addEventListeners() {
  window.addEventListener('click', domClickListener, true);
}

export function removeEventListeners() {
  window.removeEventListener('click', domClickListener, true);
}
