import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "username")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  username: string;
}
