import {
  AUTHORIZE_MENU_CREATE,
  AUTHORIZE_MENU_DELETE,
  AUTHORIZE_MENU_EDIT,
  AUTHORIZE_MENU_GET,
  AUTHORIZE_MENU_GETALL,
} from '@/app/core/constants';
import { ApiAuthorize, User } from '@/app/core/decorators';
import { Result } from '@/app/core/interfaces';
import { success } from '@/app/core/utils';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecordList } from './dto/create-record.dto';
import { RecordService } from './record.service';
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Post()
  async create(
    @Body() { recordList, ua }: CreateRecordList,
    @User() user,
  ): Promise<Result> {
    return success(
      '录制数据提交成功',
      await this.recordService.create(recordList, ua, user.id),
    );
  }

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Result> {
    return success(
      '录制数获取成功',
      await this.recordService.getRecordDetail(id),
    );
  }

  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  @Get()
  async getAll(): Promise<Result> {
    return success('获取录制数据成功', await this.recordService.getAll());
  }
}
