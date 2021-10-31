import { MessagesService } from '@app/services';
import { Message } from '@app/types';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messagesService: MessagesService) {}

  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return this.messagesService.getAll();
  }

  @Mutation(() => Boolean)
  async addMessage(
    @Args('from', { type: () => String }) from: string,
    @Args('message', { type: () => String }) message: string,
  ): Promise<boolean> {
    const msg = await this.messagesService.addMessage(from, message);
    pubSub.publish('messageAdded', { messageAdded: msg });
    return true;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
