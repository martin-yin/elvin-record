import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ElConfigService } from './config.service';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private elConfigService: ElConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return this.elConfigService.get('jwt');
  }
}
