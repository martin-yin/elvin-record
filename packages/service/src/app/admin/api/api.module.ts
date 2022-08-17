import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiEntity } from './entity/api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiEntity])],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class PermissionModule {}
