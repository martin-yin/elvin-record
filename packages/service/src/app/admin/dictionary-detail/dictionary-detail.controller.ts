import {
  AUTHORIZEDICTIONARYDETAILCREATE,
  AUTHORIZEDICTIONARYDETAILGET,
  AUTHORIZEDICTIONARYDETAILEDIT,
  AUTHORIZEDICTIONARYDETAILDELETE,
} from '@/app/core/constants';
import { Permission } from '@/app/core/decorators/permission.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DictionaryDetailService } from './dictionary-detail.service';
import { CreateDictionaryDetailDto, EditDictionaryDetailDto } from './dtos';

@Controller('dictionary-detail')
export class DictionaryDetailController {
  constructor(
    private readonly dictionaryDetailService: DictionaryDetailService,
  ) {}

  @Permission(AUTHORIZEDICTIONARYDETAILCREATE)
  @Post()
  create(@Body() createDictionary: CreateDictionaryDetailDto) {
    return this.dictionaryDetailService.create(createDictionary);
  }

  @Permission(AUTHORIZEDICTIONARYDETAILGET)
  @Get(':id')
  detail(@Param('id') id: string) {
    return this.dictionaryDetailService.detail(+id);
  }

  @Permission(AUTHORIZEDICTIONARYDETAILEDIT)
  @Patch(':id')
  edit(
    @Param('id') id: string,
    @Body() updateDictionary: EditDictionaryDetailDto,
  ) {
    return this.dictionaryDetailService.baseUpdate(+id, updateDictionary);
  }

  @Permission(AUTHORIZEDICTIONARYDETAILDELETE)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dictionaryDetailService.baseDelete(+id);
  }
}
