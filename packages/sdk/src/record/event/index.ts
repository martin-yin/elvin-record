import { record } from 'rrweb';
import { extractErrorStack } from '../../utils/extractErrorStack';

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

export const errorListener = (event: any) => {
  const error = extractErrorStack(event) as any;

  record.addCustomEvent('error', {
    event: error
  });
};

/**
 *
 * @param param
 */
export function addEventListeners() {
  window.addEventListener('click', domClickListener, true);

  window.addEventListener('error', errorListener, true);
}

export function removeEventListeners() {
  window.removeEventListener('click', domClickListener, true);
}
