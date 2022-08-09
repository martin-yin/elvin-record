import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';

import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import * as _ from 'lodash';
import { CONSOLE_TOP_LINE, CONSOLE_BOTTOM_LINE } from '../constants';
import { Color } from '../enums';
import { TimeUtil, ColorUtil } from '../utils';
import { ElConfigService } from './config.service';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  constructor(
    private elConfigService: ElConfigService,
    private timeUtil: TimeUtil,
    private colorUtil: ColorUtil,
  ) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const LOGGER_FILE = this.elConfigService.get('LOGGER_FILE');
    const LOGGER_CONSOLE = this.elConfigService.get('LOGGER_CONSOLE');
    const dailyRotateFileOption = {
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '30d',
      json: false,
      silent: LOGGER_FILE != 'true',
    };

    return {
      exitOnError: false,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint(),
        format.ms(),
      ),
      transports: [
        new transports.DailyRotateFile({
          ...dailyRotateFileOption,
          level: 'info',
          auditFile: path.join(
            __dirname,
            '..',
            'logs',
            `${this.timeUtil.dateFormat('yyyy-MM-dd')}-success.json`,
          ),
          filename: `%DATE%-success.log`,
        }),
        new transports.DailyRotateFile({
          ...dailyRotateFileOption,
          level: 'error',
          auditFile: path.join(
            __dirname,
            '..',
            'logs',
            `${this.timeUtil.dateFormat('yyyy-MM-dd')}-error.json`,
          ),
          filename: `%DATE%-error.log`,
        }),
        new transports.Console({
          silent: LOGGER_CONSOLE != 'true',
          format: format.combine(
            format.printf((info) => {
              const color = Color[info.level];
              let level: string;

              switch (info.level) {
                case 'info':
                  level = ' Info ';
                  break;
                case 'warn':
                  level = ' Warn ';
                  break;
                case 'error':
                  level = ' Error ';
                  break;
              }

              // 信息格式处理
              const messages =
                info.message ||
                JSON.stringify(
                  _.omit(info, ['context', 'level', 'timestamp', 'ms']),
                );

              const message =
                this.colorUtil.hex(color, CONSOLE_TOP_LINE) +
                messages +
                this.colorUtil.hex(color, CONSOLE_BOTTOM_LINE);

              const result = `${this.colorUtil.color
                .bgHex(color)
                .hex(Color.black)
                .bold(level)} ${this.colorUtil.hex(
                Color.blue,
                info.timestamp,
              )} ${this.colorUtil.hex(
                Color.warn,
                '[' + info.context + ']',
              )} ${this.colorUtil.hex(Color.warn, info.ms)}: \n${message}`;

              return result;
            }),
          ),
        }),
      ],
    };
  }
}
