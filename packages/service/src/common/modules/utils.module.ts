import { Module, Global } from '@nestjs/common';
import {
  ColorUtil,
  CommonUtil,
  CryptoUtil,
  FileUtil,
  TimeUtil,
} from '../utils';

@Global()
@Module({
  providers: [ColorUtil, CommonUtil, CryptoUtil, FileUtil, TimeUtil],
  exports: [ColorUtil, CommonUtil, CryptoUtil, FileUtil, TimeUtil],
})
export class UtilsModule {}
