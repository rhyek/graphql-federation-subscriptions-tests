import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.type';
import { User } from './user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly messageService: MessageService) {}

  @ResolveField(() => [Message])
  messages(@Parent() parent: User): Message[] {
    return this.messageService.getAllForUsername(parent.username);
  }
}
