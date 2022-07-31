export function getTimestamp(): number {
  return Date.now();
}

export function getLocationHref(): string {
  if (typeof document === 'undefined' || document.location == null) return '';

  return document.location.href;
}

export function getBigVersion(version: string) {
  return Number(version.split('.')[0]);
}

export function replaceOld(source: any, name: string, replacement: (...args: any[]) => any, isForced = false): void {
  if (name in source || isForced) {
    const original = source[name];
    const wrapped = replacement(original);

    if (typeof wrapped === 'function') {
      source[name] = wrapped;
    }
  }
}

export function isHttpFail(code: number) {
  return code === 0 || code === HTTP_CODE.BAD_REQUEST || code > HTTP_CODE.UNAUTHORIZED;
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_EXCEPTION = 500
}
