import ErrorStackParser from 'error-stack-parser';
import { getLocationHref, getTimestamp } from './helpers';

export function extractErrorStack(target: any) {
  let isPromise = false;

  if (target?.reason) {
    isPromise = true;
  }

  const stackFrames = isPromise ? ErrorStackParser.parse(target.reason) : ErrorStackParser.parse(target.error);

  return {
    name: isPromise ? 'Promise Error' : target.error.stack.split(':')[0],
    message: isPromise ? target.reason.message : target.error.message,
    stack: isPromise ? target.reason.stack : target.error.toString(),
    stackFrames: stackFrames || '',
    happenTime: getTimestamp(),
    url: getLocationHref()
  };
}
