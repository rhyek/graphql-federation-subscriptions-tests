import { Injectable } from '@nestjs/common';
import nanoid from 'nanoid';
import { Message } from '@app/types';

@Injectable()
export class MessageService {
  private messages: Message[] = [
    {
      id: 'ssdsdsd',
      username: 'carlos',
      message: 'hello, world',
    },
  ];

  async getAll(): Promise<Message[]> {
    return this.messages;
  }

  findById(id: string): Message {
    const message = this.messages.find((message) => message.id === id);
    if (!message) {
      throw new Error('not found');
    }
    return message;
  }

  async addMessage(from: string, message: string) {
    const msg = new Message();
    msg.id = nanoid.nanoid();
    msg.username = from;
    msg.message = message;
    this.messages.push(msg);
    return msg;
  }
}
