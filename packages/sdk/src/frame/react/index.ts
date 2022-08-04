import { record } from 'rrweb';
import { extractErrorStack } from '../../utils/extractErrorStack';
import { isError } from '../../utils/is';

/**
 * react 捕捉到bug时通过这个函数传递给 rrweb。
 * @param ex
 * @returns
 */
export function errorBoundary(ex: any): void {
  if (!isError(ex)) {
    console.warn('传入的react error不是一个object Error');

    return;
  }

  const error = extractErrorStack(ex) as any;

  record.addCustomEvent('error', {
    event: error
  });
}
