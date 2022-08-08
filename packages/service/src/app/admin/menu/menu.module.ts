import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entity/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [],
  providers: [],
})
export class MenuModule {}
