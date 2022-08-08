import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiEntity } from './entity/api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiEntity])],
  controllers: [],
  providers: [],
})
export class ApiModule {}
