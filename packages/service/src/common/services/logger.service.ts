import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class ElLogger extends ConsoleLogger {
  constructor() {
    super(ElLogger.name, {
      timestamp: false,
    });
  }
}
