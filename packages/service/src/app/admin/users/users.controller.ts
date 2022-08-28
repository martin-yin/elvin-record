import {
  AUTHORIZE_USER_GET,
  AUTHORIZE_USER_GETALL,
} from '@/app/core/constants';
import { ApiAuthorize, User } from '@/app/core/decorators';
import { Result } from '@/app/core/interfaces';
import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  @Get()
  async getAll(): Promise<Result> {
    return await this.usersService.getAll();
  }

  // @ApiAuthorize(AUTHORIZE_USER_GET)
  // @Get(':id')
  // async get(@Param('id') id: number): Promise<Result> {
  //   return await this.usersService.getOne(id);
  // }

  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  @Get('getUserInfo')
  async getMore(@User() user) {
    return this.usersService.getUserInfo(user.id);
  }
}
