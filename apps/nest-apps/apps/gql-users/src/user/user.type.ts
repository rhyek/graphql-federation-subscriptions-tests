import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "username")')
export class User {
  @Field(() => ID)
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
