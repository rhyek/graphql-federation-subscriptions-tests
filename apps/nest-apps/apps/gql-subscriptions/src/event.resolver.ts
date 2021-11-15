import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessageAdded, PubSub } from '@app/types';

@Resolver(() => Boolean)
export class EventResolver {
  constructor(private pubSub: PubSub) {}

  @Query(() => Boolean)
  noop(): boolean {
    return true;
  }

  @Subscription(() => MessageAdded)
  messageAdded(): AsyncIterator<any> {
    console.log('subscribed');
    return this.pubSub.asyncIterator('MESSAGE_ADDED');
  }
}
