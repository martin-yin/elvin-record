import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResourceListDTO, UploadFilesDTO } from './resource.dto';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  list(@Body() data: ResourceListDTO) {
    return this.resourceService.getFiles(data);
  }

  @Post()
  uploadFiles(@Body() data: UploadFilesDTO) {
    return this.resourceService.uploadFiles(data);
  }
}
