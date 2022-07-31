import { record } from 'rrweb';
import { getLocationHref, getTimestamp, isHttpFail, replaceOld } from '../utils/helpers';
import { fromHttpStatus } from '../utils/httpStatus';
import { variableTypeDetection } from '../utils/is';
import type { RecordXhrData, RecordXMLHttpRequest, voidFun } from './interface';
import { on } from './interface';

export function xhrRecord(): void {
  if (!('XMLHttpRequest' in window)) {
    return;
  }

  const originalXhrProto = XMLHttpRequest.prototype as any;

  if (originalXhrProto?.xhrReplace) {
    return;
  }

  originalXhrProto.xhrReplace = true;
  replaceOld(originalXhrProto, 'open', (originalOpen: voidFun): voidFun => {
    return function (this: RecordXMLHttpRequest, ...args: any[]): void {
      const method = variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0];

      this.beforeXhrRecordData = {
        method,
        url: getLocationHref(),
        httpUrl: args[1].split('?')[0] ? args[1].split('?')[0] : args[1]
      };

      originalOpen.apply(this, args as any);
    };
  });
  replaceOld(originalXhrProto, 'send', (originalSend: voidFun): voidFun => {
    return function (this: RecordXMLHttpRequest, ...args: any[]): void {
      const { method } = this.before_report_data;
      const httoReport: RecordXhrData = {
        ...this.beforeXhrRecordData,
        status: 0,
        statusText: '',
        happenDay: '',
        responseText: '',
        requestText: '',
        happenTime: 0,
        loadTime: 0
      };
      const startTime = getTimestamp();

      on(this, 'loadend', function (this: RecordXMLHttpRequest) {
        if (method === 'POST') {
          return;
        }

        const { responseType, response, status } = this;

        httoReport.status = status;
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          httoReport.responseText = typeof response === 'object' ? JSON.stringify(response) : response;
        }

        httoReport.statusText = isHttpFail(status) ? 'fail' : fromHttpStatus(status);
        httoReport.happenTime = getTimestamp();
        httoReport.loadTime = getTimestamp() - startTime;

        record.addCustomEvent('xhr', {
          event: httoReport
        });
      });
      originalSend.apply(this, args as any);
    };
  });
}
