import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
