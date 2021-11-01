import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Module({
  providers: [MessageService, UserService],
  exports: [MessageService, UserService],
})
export class ServicesModule {}
