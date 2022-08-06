import { CommonModule } from '@/common/common.module';
import { SysConfigModule } from '@/config/config.module';
import { Module } from '@nestjs/common';
import { ResourceModule } from './resource/resource.module';
import { UploadFileController } from './upload/upload.controller';

@Module({
  imports: [
    CommonModule,
    SysConfigModule,
    ResourceModule,
    // SiteModule,
  ],
  controllers: [UploadFileController],
  providers: [],
})
export class AppModule {}
