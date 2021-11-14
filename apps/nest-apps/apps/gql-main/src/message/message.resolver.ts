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
import { User } from './user.type';
// import { UserService } from '../user/user.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    // private userService: UserService,
    private pubSub: PubSub,
  ) {}

  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return this.messageService.getAll();
  }

  // @ResolveField(() => User)
  // user(@Parent() parent: Message): User {
  //   const user = this.userService.find(parent.username);
  //   return user;
  // }

  @ResolveField(() => User)
  user(@Parent() parent: Message): any {
    console.log('user in message resolver');
    return { __typename: 'User', username: parent.username };
  }

  @Mutation(() => Boolean)
  async addMessage(
    @Args('from', { type: () => String }) from: string,
    @Args('message', { type: () => String }) message: string,
  ): Promise<boolean> {
    const msg = await this.messageService.addMessage(from, message);
    this.pubSub.publish('messageAdded', { messageAdded: msg });
    return true;
  }

  // @Subscription(() => Message)
  // messageAdded() {
  //   return this.pubSub.asyncIterator('messageAdded');
  // }
}
