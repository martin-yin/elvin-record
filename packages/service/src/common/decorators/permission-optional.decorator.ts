import { SetMetadata } from '@nestjs/common';
export const PERMISSION_OPTIONAL_KEY_METADATA =
  'admin_module:permission_optional';
/**
 * 使用该注解可开放当前Api权限，无需权限访问，但是仍然需要校验身份Token
 */
export const PermissionOptional = () =>
  SetMetadata(PERMISSION_OPTIONAL_KEY_METADATA, true);
