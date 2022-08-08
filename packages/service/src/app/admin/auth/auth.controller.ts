import { LocalAuthGuard, JwtRefreshGuard } from '@/common/guards';
import { Result } from '@/common/interfaces';
import { Controller, UseGuards, Req, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos';

import { Request } from 'express';
import { UserEntity } from '../users/entity/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<Result> {
    return await this.authService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }: RequestWithUser): Promise<Result> {
    return await this.authService.login(user);
  }

  @Post('logout')
  async logout(@Body('id') id: number): Promise<Result> {
    return await this.authService.logout(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() { user }: RequestWithUser): Promise<Result> {
    return await this.authService.refresh(user);
  }
}