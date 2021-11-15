import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "username")')
export class UserObject {
  @Field(() => ID)
  @Directive('@external')
  username: string;
}
