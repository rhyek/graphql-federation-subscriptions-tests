import {
  Parent,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; username: string }): User {
  //   const user = this.userService.find(reference.username);
  //   return user;
  // }

  @ResolveField(() => String)
  fullName(@Parent() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
