import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SysConfigService {
  constructor(private configService: ConfigService) {}

  get<T = any>(propertyPath: string, defaultValue?: T): T {
    return this.configService.get(propertyPath, defaultValue);
  }

  get port(): number {
    return this.configService.get('database_port');
  }

  /**
   * JWT密钥
   */
  get jwtSecret(): string {
    return this.configService.get('jwt_secret');
  }

  /**
   * JWT 过期时间
   */
  get jwtExpiresIn(): string {
    return this.configService.get('jwt_expiresIn');
  }
}
