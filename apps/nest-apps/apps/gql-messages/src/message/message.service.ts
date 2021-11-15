import { Injectable } from '@nestjs/common';
import nanoid from 'nanoid';
import { Message } from './message.type';

@Injectable()
export class MessageService {
  private messages: Message[] = [
    {
      id: 'ssdsdsd',
      username: 'carlos',
      message: 'hello, world',
    },
  ];

  getAll(): Message[] {
    return this.messages;
  }

  findById(messageId: string): Message {
    const message = this.messages.find((message) => message.id === messageId);
    if (!message) {
      throw new Error('Message not found.');
    }
    return message;
  }

  getAllForUsername(username: string): Message[] {
    return this.messages.filter((message) => message.username === username);
  }

  addMessage(from: string, message: string) {
    const msg = new Message();
    msg.id = nanoid.nanoid();
    msg.username = from;
    msg.message = message;
    this.messages.push(msg);
    return msg;
  }
}
