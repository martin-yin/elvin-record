import { JwtAuthGuard } from '@/common/guards';
import { Result } from '@/common/interfaces';
import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller()
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
