import { UserEntity } from '@app/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private users: UserEntity[] = [
    plainToClass(UserEntity, {
      username: 'carlos',
      firstName: 'Carlos',
      lastName: 'González',
    }),
    plainToClass(UserEntity, {
      username: 'lina',
      firstName: 'Lina',
      lastName: 'Alemán',
    }),
  ];

  all(): UserEntity[] {
    return this.users;
  }

  find(username: string): UserEntity {
    const found = this.users.find((user) => user.username === username);
    if (!found) {
      throw new Error('user not found');
    }
    return found;
  }
}
