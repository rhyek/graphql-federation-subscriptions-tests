import { InfrastructureModule } from '@app/infrastructure';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [InfrastructureModule, UserModule],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
