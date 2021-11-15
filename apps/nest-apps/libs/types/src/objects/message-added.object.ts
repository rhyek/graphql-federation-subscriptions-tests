import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageAdded {
  @Field()
  messageId: string;
}
