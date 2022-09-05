import { record } from 'rrweb';
import { getLocationHref, getTimestamp, isHttpFail, replaceOld } from '../../utils/helpers';
import { fromHttpStatus } from '../../utils/httpStatus';
import { variableTypeDetection } from '../../utils/is';

import type { RecordXhrData, RecordXMLHttpRequest, voidFun } from './interface';
import { on } from './interface';

export function xhrEventRecord(reportUrl: string): void {
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
        httpUrl: args[1]
      };

      originalOpen.apply(this, args as any);
    };
  });
  replaceOld(originalXhrProto, 'send', (originalSend: voidFun): voidFun => {
    return function (this: RecordXMLHttpRequest, ...args: any[]): void {
      const { method } = this.beforeXhrRecordData;
      const httpReport: RecordXhrData = {
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
        if (method === 'POST' && this.beforeXhrRecordData.httpUrl === reportUrl) {
          return;
        }

        const { responseType, response, status } = this;

        httpReport.requestData = args[0];
        httpReport.status = status;
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          httpReport.responseText = typeof response === 'object' ? JSON.stringify(response) : response;
        }

        httpReport.statusText = isHttpFail(status) ? 'fail' : fromHttpStatus(status);
        httpReport.happenTime = getTimestamp();
        httpReport.loadTime = getTimestamp() - startTime;

        record.addCustomEvent('xhr', {
          event: httpReport
        });
      });
      originalSend.apply(this, args as any);
    };
  });
}
