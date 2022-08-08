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
import {
  CreateDictionaryDto,
  GetDictionaryDto,
  UpdateDictionaryDto,
} from './dictionary.dto';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  create(@Body() createDictionary: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionary);
  }

  @Get()
  list(@Query() getDictionary: GetDictionaryDto) {
    return this.dictionaryService.list(getDictionary);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDictionary: UpdateDictionaryDto,
  ) {
    return this.dictionaryService.update(+id, updateDictionary);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dictionaryService.delete(+id);
  }
}
