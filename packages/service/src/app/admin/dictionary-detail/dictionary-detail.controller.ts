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

  @Post()
  create(@Body() createDictionary: CreateDictionaryDetailDto) {
    return this.dictionaryDetailService.create(createDictionary);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.dictionaryDetailService.detail(+id);
  }

  @Patch(':id')
  edit(
    @Param('id') id: string,
    @Body() updateDictionary: EditDictionaryDetailDto,
  ) {
    return this.dictionaryDetailService.baseUpdate(+id, updateDictionary);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dictionaryDetailService.baseDelete(+id);
  }
}
