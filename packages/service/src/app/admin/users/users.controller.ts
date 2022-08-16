import {
  AUTHORIZE_USER_GET,
  AUTHORIZE_USER_GETALL,
} from '@/app/core/constants';
import { ApiAuthorize } from '@/app/core/decorators';
import { Result } from '@/app/core/interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiAuthorize(AUTHORIZE_USER_GET)
  @Get()
  async getAll(): Promise<Result> {
    return await this.usersService.getAll();
  }

  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.usersService.getOne(id);
  }
}
