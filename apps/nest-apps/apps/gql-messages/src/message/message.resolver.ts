import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from '@app/types';
import { Message } from './message.type';
import { MessageService } from './message.service';
import { UserObject } from './user.type';
import { Reference } from '@app/types/reference';
// import { UserService } from '../user/user.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    // private userService: UserService,
    private pubSub: PubSub,
  ) {}

  @Query(() => [Message])
  messages(): Message[] {
    return this.messageService.getAll();
  }

  // @ResolveField(() => User)
  // user(@Parent() parent: Message): User {
  //   const user = this.userService.find(parent.username);
  //   return user;
  // }

  @ResolveField(() => UserObject)
  user(@Parent() message: Message): Reference<UserObject, 'username'> {
    return { __typename: 'User', username: message.username };
  }

  @Mutation(() => Boolean)
  async addMessage(
    @Args('from', { type: () => String }) from: string,
    @Args('message', { type: () => String }) message: string,
  ): Promise<boolean> {
    const msg = this.messageService.addMessage(from, message);
    this.pubSub.publish('messageAdded', { messageAdded: msg });
    return true;
  }

  // @Subscription(() => Message)
  // messageAdded() {
  //   return this.pubSub.asyncIterator('messageAdded');
  // }
}
