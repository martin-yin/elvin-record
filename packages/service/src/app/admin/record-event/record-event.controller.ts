import {
  AUTHORIZE_MENU_CREATE,
  AUTHORIZE_MENU_DELETE,
  AUTHORIZE_MENU_EDIT,
  AUTHORIZE_MENU_GET,
  AUTHORIZE_MENU_GETALL,
} from '@/app/core/constants';
import { ApiAuthorize } from '@/app/core/decorators';
import { Result } from '@/app/core/interfaces';
import { success } from '@/app/core/utils';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecordEvent } from './dto/create-record-event.dto';
import { RecordEventService } from './record-event.service';
@Controller('record-event')
export class RecordEventController {
  constructor(private readonly recordEventService: RecordEventService) {}

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Post()
  async create(@Body() recordEvent: CreateRecordEvent): Promise<Result> {
    return success(
      '录制数据提交成功',
      await this.recordEventService.create(recordEvent),
    );
  }

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return success('录制数获取成功', await this.recordEventService.findOne(id));
  }

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Get()
  async getAll(): Promise<Result> {
    return success('获取录制数据成功', await this.recordEventService.getAll());
  }
}
