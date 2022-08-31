import { Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync, existsSync } from 'fs';

@Injectable()
export class FileService {
  folderExists(fileDir: string) {
    return existsSync(fileDir);
  }

  writeFile(fileDir: string, filePath: string) {
    try {
      if (!this.folderExists(fileDir)) {
        mkdirSync(fileDir);
      }
      createWriteStream(filePath);
      return true;
    } catch (e) {
      return e;
    }
  }
}
