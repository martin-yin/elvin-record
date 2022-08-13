import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Result } from '@/app/core/interfaces';
import { AUTHORIZEUSERGET, AUTHORIZEUSERGETALL } from '@/app/core/constants';
import { Permission } from '@/app/core/decorators/permission.decorator';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Permission(AUTHORIZEUSERGET)
  @Get()
  async getAll(): Promise<Result> {
    return await this.usersService.getAll();
  }

  @Permission(AUTHORIZEUSERGETALL)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.usersService.getOne(id);
  }
}
