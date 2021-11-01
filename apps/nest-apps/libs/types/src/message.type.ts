import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  message: string;
}
