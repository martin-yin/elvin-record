import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto, GetDictionaryDto } from './dtos';
import { EditDictionaryDto } from './dtos/edit-dictionary.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  create(@Body() createDictionary: CreateDictionaryDto) {
    return this.dictionaryService.baseCreate(createDictionary);
  }

  @Get()
  getAll(@Query() getDictionary: GetDictionaryDto) {
    return this.dictionaryService.getAll(getDictionary);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() updateDictionary: EditDictionaryDto) {
    return this.dictionaryService.baseEdit(+id, updateDictionary);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dictionaryService.baseDelete(+id);
  }
}
