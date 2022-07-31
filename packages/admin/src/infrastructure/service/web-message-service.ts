import { message } from 'antd';
import type { MessageService } from '../interface/message';

export class WebMessageService implements MessageService {
  info(content: string, duration?: number | (() => void)): void {
    message.info(content, duration);
  }
  success(content: string, duration?: number | (() => void)): void {
    message.success(content, duration);
  }
  error(content: string, duration?: number | (() => void)): void {
    message.error(content, duration);
  }
  warning(content: string, duration?: number | (() => void)): void {
    message.warning(content, duration);
  }
}
