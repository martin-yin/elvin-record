import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEventEntity } from './entity/record-event.entity';
import { RecordEntity } from './entity/record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity, RecordEventEntity])],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
