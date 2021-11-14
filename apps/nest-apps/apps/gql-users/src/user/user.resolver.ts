import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; username: string }): User {
    console.log('resolve reference');
    const user = this.userService.find(reference.username);
    return user;
  }

  @Query(() => [User])
  users(): User[] {
    return this.userService.all();
  }

  @ResolveField(() => String)
  fullName(@Parent() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
