import { Message } from '@app/types';
import { Injectable } from '@nestjs/common';
import nanoid from 'nanoid';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: 'ssdsdsd',
      from: 'carlos',
      message: 'hello, world',
    },
  ];

  async getAll(): Promise<Message[]> {
    return this.messages;
  }

  async addMessage(from: string, message: string) {
    const msg = new Message();
    msg.id = nanoid.nanoid();
    msg.from = from;
    msg.message = message;
    this.messages.push(msg);
    return msg;
  }
}
