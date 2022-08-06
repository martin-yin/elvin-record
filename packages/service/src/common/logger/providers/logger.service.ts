import { Injectable, Scope, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { Logger } from 'winston';
import * as sourceMap from 'source-map-js';
import * as stackTrace from 'stacktrace-js';
import * as path from 'path';
import * as fs from 'fs';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService extends WinstonLogger {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winston: Logger,
  ) {
    super(winston);
  }

  info(message: any): void {
    super.log(message);
  }

  warn(message: any): void {
    super.warn(message);
  }

  error(message: any, trace?: any): void {
    super.error(message, trace);
  }

  debug?(message: any): void {
    super.debug(message);
  }

  verbose?(message: any): void {
    super.verbose(message);
  }

  /**
   * Http请求信息处理
   * @param status
   * @param logFormat
   */
  http(status: number, logFormat: string): void {
    // 根据状态码，进行日志类型区分
    if (status >= 500) {
      this.error(`${status} ` + logFormat);
    } else if (status >= 400) {
      this.warn(`${status} ` + logFormat);
    } else {
      this.info(`${status} ` + logFormat);
    }
  }

  /**
   * 异常报错
   * @param data
   * @param req
   * @param error
   */
  async exception(status: number, data, req, error: Error) {
    const stackFrames: stackTrace.StackFrame[] = await stackTrace.fromError(
      error,
    );
    const stackFrame = stackFrames[0];

    const sourceInfo = this.findCodeBySourceMap(
      `${stackFrame.fileName}.map`,
      stackFrame.lineNumber,
      stackFrame.columnNumber,
    );
    if (sourceInfo instanceof Error) this.error('node_module error', error);

    const logFormat = `${status} ${req.method} 请求地址: ${
      req.originalUrl
    } 请求IP: ${req.ip}\n 响应内容: ${JSON.stringify(data)}\n 函数名称：${
      stackFrame.functionName
    } \n 源文件：${
      sourceInfo.fileName + ':' + sourceInfo.line + ':' + sourceInfo.column
    }`;
    this.error(logFormat, error);
  }

  /**
   * 通过sourcemap 解析出源码，可以追溯到哪个文件、第几行第几列
   * @param sourcePath
   * @param line
   * @param column
   * @returns
   */
  findCodeBySourceMap(sourceMapPath: string, line: number, column: number) {
    try {
      const sourceMapCode: string = fs.readFileSync(sourceMapPath, 'utf-8');

      if (sourceMapCode) {
        const consumer = new sourceMap.SourceMapConsumer(
          JSON.parse(sourceMapCode),
        );
        // 通过报错位置查找到对应的源文件名称以及报错行数
        const lookUpResult = consumer.originalPositionFor({
          line: line,
          column: column,
        });
        const fileName = path.join(__dirname, lookUpResult.source);
        return {
          source: fs.readFileSync(fileName, 'utf-8'),
          ...lookUpResult,
          fileName,
        };
      }
    } catch (error) {
      return error;
    }
  }
}
