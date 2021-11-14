import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from './user.type';

@Injectable()
export class UserService {
  private users: User[] = [
    plainToClass(User, {
      username: 'carlos',
      firstName: 'Carlos',
      lastName: 'González',
    }),
    plainToClass(User, {
      username: 'lina',
      firstName: 'Lina',
      lastName: 'Alemán',
    }),
  ];

  all(): User[] {
    return this.users;
  }

  find(username: string): User {
    const found = this.users.find((user) => user.username === username);
    if (!found) {
      throw new Error('user not found');
    }
    return found;
  }
}
