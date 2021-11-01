import {
  Resolver,
  Subscription,
  ObjectType,
  Field,
  ID,
  Directive,
  Query,
  Int,
} from '@nestjs/graphql';
import { PubSub } from '@app/types';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Message {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => Int)
  likes: number = 3;
}

@Resolver(() => Message)
export class MessageResolver {
  constructor(private pubSub: PubSub) {
    setInterval(() => {
      this.pubSub.publish('test', {
        test: {
          content: 'lo',
        },
      });
    }, 1_000);
  }

  @Query(() => Boolean)
  noop(): boolean {
    return true;
  }

  @Subscription(() => Message)
  messageAdded() {
    console.log('subscribed to 3');
    return this.pubSub.asyncIterator('messageAdded');
  }
}
