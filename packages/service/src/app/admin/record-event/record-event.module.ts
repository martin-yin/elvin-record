import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEventEntity } from './entity/record-event.entity';
import { RecordEventController } from './record-event.controller';
import { RecordEventService } from './record-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEventEntity])],
  controllers: [RecordEventController],
  providers: [RecordEventService],
  exports: [RecordEventService],
})
export class RecordEventModule {}
