import { InfrastructureModule } from '@app/infrastructure';
import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [InfrastructureModule],
  providers: [MessageService, MessageResolver, UserResolver],
})
export class MessageModule {}
