import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdhibitionController } from './adhibition.controller';
import { AdhibitionService } from './adhibition.service';
import { AdhibitionEntity } from './entity/adhibition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdhibitionEntity])],
  controllers: [AdhibitionController],
  providers: [AdhibitionService],
  exports: [AdhibitionService],
})
export class AdhibitionModule {}
