import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [],
  exports: [],
})
export class CommonModule {}
