import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Result } from '@/app/core/interfaces';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Result> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return await this.usersService.getOne(id);
  }
}
