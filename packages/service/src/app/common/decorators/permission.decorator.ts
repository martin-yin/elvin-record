import { SetMetadata } from '@nestjs/common';
import { AUTHORIZE_KEY_METADATA } from '../constants';

export const Permission = (...perms: Array<string | Array<string | null>>) => {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (perms.length < 1) {
      throw new Error(
        `${target.constructor.name}.${String(key)} 定义了空权限编号`,
      );
    }

    SetMetadata(AUTHORIZE_KEY_METADATA, perms)(target, key, descriptor);
  };
};
