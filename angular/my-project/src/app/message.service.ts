import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() {
  }

  /**
   * 添加消息
   * @param {string} message
   */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * 清空消息
   */
  clear() {
    this.messages = [];
  }
}
