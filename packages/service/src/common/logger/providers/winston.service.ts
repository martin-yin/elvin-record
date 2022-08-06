import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as dateFns from 'date-fns';
import * as path from 'path';
import { CONSOLE_BOTTOM_LINE, CONSOLE_TOP_LINE } from '../constants/symbol';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  private dailyRotateFileOption = {
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD',
    maxSize: '10m',
    maxFiles: '30d',
    json: true,
    silent: true,
  };

  createWinstonModuleOptions(): WinstonModuleOptions {
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
          ...this.dailyRotateFileOption,
          level: 'info',
          auditFile: path.join(
            __dirname,
            '..',
            'logs',
            `${dateFns.format(new Date(), 'yyyy-MM-dd')}-info.json`,
          ),
          filename: `%DATE%-info.log`,
        }),

        new transports.DailyRotateFile({
          ...this.dailyRotateFileOption,
          level: 'info',
          auditFile: path.join(
            __dirname,
            '..',
            'logs',
            `${dateFns.format(new Date(), 'yyyy-MM-dd')}.json`,
          ),
          filename: `%DATE%.log`,
        }),
        new transports.Console({
          silent: false,
          format: format.combine(
            format.printf((info) => {
              let level: string;

              switch (info.level) {
                case 'info':
                  level = ' Info  ';
                  break;
                case 'warn':
                  level = ' Warn  ';
                  break;
                case 'error':
                  level = ' Error ';
                  break;
              }
              // 信息格式处理
              const message =
                CONSOLE_TOP_LINE + info.message + CONSOLE_BOTTOM_LINE;
              return `${level} ${info.timestamp} ${'[' + info.context + ']'} ${
                info.ms
              }: \n${message}`;
            }),
          ),
        }),
      ],
    };
  }
}
