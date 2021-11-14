import { InfrastructureModule } from '@app/infrastructure';
import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [InfrastructureModule],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
