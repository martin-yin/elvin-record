import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './entity/resource.entity';
import { ResourceGroupEntity } from './entity/resource.group.entity';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity, ResourceGroupEntity])],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
