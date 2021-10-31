import { MessagesService } from '@app/services';
import { Message, PubSub } from '@app/types';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private messagesService: MessagesService,
    private pubSub: PubSub,
  ) {}

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
    this.pubSub.publish('messageAdded', { messageAdded: msg });
    return true;
  }

  @Subscription(() => Message)
  messageAdded() {
    return this.pubSub.asyncIterator('messageAdded');
  }
}
