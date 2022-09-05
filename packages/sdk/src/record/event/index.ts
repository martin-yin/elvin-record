import { record } from 'rrweb';
import { extractErrorStack } from '../../utils/extractErrorStack';

export const getElmPath = function (e: any) {
  if (!e || 1 !== e.nodeType) return '';
  const ret = [];
  let deepLength = 0; // 层数，最多5层
  let elm = ''; // 元素

  ret.push(`(${e.innerText.substr(0, 50)})`);
  for (let target = e || null; target && deepLength++ < 5 && !('html' === (elm = normalTarget(target))); ) {
    ret.push(elm);
    target = target.parentNode;
  }

  return ret.reverse().join(' > ');
};

const normalTarget = function (e: any) {
  let t;
  let n;
  let r;
  let a;
  let i;
  const o = [];

  if (!e || !e.tagName) return '';
  if (
    (o.push(e.tagName.toLowerCase()),
    e.id && o.push('#'.concat(e.id)),
    (t = e.className) && '[object String]' === Object.prototype.toString.call(t))
  ) {
    for (n = t.split(/\s+/), i = 0; i < n.length; i++) {
      if (n[i].indexOf('active') < 0) {
        o.push('.'.concat(n[i]));
      }
    }
  }

  const s = ['type', 'name', 'title', 'alt'];

  for (i = 0; i < s.length; i++) (r = s[i]), (a = e.getAttribute(r)) && o.push('['.concat(r, '="').concat(a, '"]'));

  return o.join('');
};

/**
 * 监听dom 点击事件
 * @param event
 */
const domClickListener = (event: any) => {
  const dom = event.target as HTMLElement;
  const input = event.target as HTMLInputElement;

  record.addCustomEvent('dom-click', {
    event: {
      className: dom.className,
      innerText: dom.innerText,
      tagName: dom.tagName,
      type: event.type,
      inputValue: input.value,
      placeholder: input.placeholder,
      path: getElmPath(event.target)
    }
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
