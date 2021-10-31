import { MessagesService } from '@app/services/messages.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MessagesService],
  exports: [MessagesService],
})
export class ServicesModule {}
