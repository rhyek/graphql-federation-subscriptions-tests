import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  from: string;

  @Field()
  message: string;
}
