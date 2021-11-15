import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
@Directive('@key(fields: "username")')
export class UserObject {
  @Field(() => ID)
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
