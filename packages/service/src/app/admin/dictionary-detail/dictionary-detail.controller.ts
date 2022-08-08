import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateDictionaryDetailDto,
  UpdateDictionaryDetailDto,
} from './dictionary-detail.dto';
import { DictionaryDetailService } from './dictionary-detail.service';

@Controller('dictionary-detail')
export class DictionaryDetailController {
  constructor(
    private readonly dictionaryDetailService: DictionaryDetailService,
  ) {}

  @Post()
  create(@Body() createDictionary: CreateDictionaryDetailDto) {
    return this.dictionaryDetailService.createDetail(createDictionary);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.dictionaryDetailService.detail(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDictionary: UpdateDictionaryDetailDto,
  ) {
    return this.dictionaryDetailService.update(+id, updateDictionary);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dictionaryDetailService.delete(+id);
  }
}
