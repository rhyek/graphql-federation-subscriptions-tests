import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.type';
import { UserObject } from './user.type';

@Resolver(() => UserObject)
export class UserResolver {
  constructor(private readonly messageService: MessageService) {}

  @ResolveField(() => [Message])
  messages(@Parent() user: UserObject): Message[] {
    return this.messageService.getAllForUsername(user.username);
  }
}
