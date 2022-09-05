import type { eventWithTime } from 'rrweb/typings/types';
import * as rrweb from 'rrweb';

export const getCommon = () => {
  const u = (navigator as any).connection;

  return {
    language: getLang(),
    screen: screen.width + 'x' + screen.height,
    vp: getScreen(),
    connection_type: u ? u.effectiveType : '',
    ua: navigator.userAgent,
    happendTime: Math.round((new Date() as any) / 1000)
  };
};

export const getPackEvent = (event: eventWithTime | any) => {
  if (event.type === 4 || event.type === 5) {
    if (event.type === 4 && event.data.href !== '') {
      event.data.payload = {
        type: 'url',
        href: event.data.href,
        ...getCommon()
      };
    } else {
      event.data.payload = {
        type: event.data.tag,
        text: event.data.payload?.text || '',
        ...event.data.payload.event,
        ...getCommon()
      };
    }
  }

  return rrweb.pack(event);
};

export const getScreen = () => {
  const w = document.documentElement.clientWidth || document.body.clientWidth;
  const h = document.documentElement.clientHeight || document.body.clientHeight;

  return w + 'x' + h;
};

export const getLang = () => {
  let lang = navigator.language || (navigator as any).userLanguage; //常规浏览器语言和IE浏览器

  lang = lang.substr(0, 2); //截取lang前2位字符

  return lang;
};
