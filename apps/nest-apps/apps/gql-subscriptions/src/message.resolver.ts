import { Resolver, Subscription } from '@nestjs/graphql';
import { Message, PubSub } from '@app/types';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private pubSub: PubSub) {}

  @Subscription(() => Message)
  messageAdded() {
    console.log('subscribed to 3');
    return this.pubSub.asyncIterator('messageAdded');
  }
}
