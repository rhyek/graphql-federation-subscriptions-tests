import {
  Field,
  ObjectType,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from '@app/types';

@ObjectType()
export class TestMessage {
  @Field()
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

@Resolver(() => TestMessage)
export class TestResolver {
  constructor(private pubSub: PubSub) {
    setInterval(() => {
      this.pubSub.publish('testMessageAdded', {
        testMessageAdded: new TestMessage('hello'),
      });
    }, 1_000);
  }

  @Query(() => Boolean)
  noop(): boolean {
    return true;
  }

  @Subscription(() => TestMessage)
  testMessageAdded() {
    console.log('subscribed to 2');
    return this.pubSub.asyncIterator('testMessageAdded');
  }
}
