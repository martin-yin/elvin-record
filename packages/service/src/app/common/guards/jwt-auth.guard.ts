import { RedisService } from '@liaoliaots/nestjs-redis';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';
import * as _ from 'lodash';
import { ApiException } from '../exceptions';
import { AUTHORIZE_KEY_METADATA } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const permissionList = this.reflector.get<
      Array<string | Array<string | null>>
    >(AUTHORIZE_KEY_METADATA, context.getHandler());
    if (!permissionList) {
      return true;
    }

    // 获取请求头里的访问令牌
    const authorization = request.headers.authorization || '';
    const accessToken = authorization.split(' ')[1];
    // 解析令牌载体
    const payload = this.jwtService.decode(accessToken);

    if (_.isNull(payload))
      throw new ApiException('无效的身份认证', HttpStatus.UNAUTHORIZED);

    // 获取缓存令牌
    const client: Redis = this.redisService.getClient();
    const cacheToken = await client.get(payload['userId']);

    request['userId'] = payload['userId'];

    // 当cacheToken存在并且与访问令牌不匹配
    if (cacheToken && accessToken !== cacheToken) {
      throw new ApiException('您的账号在其他地方登录', HttpStatus.UNAUTHORIZED);
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new ApiException('身份认证已过期', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
