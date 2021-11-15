import { Reference } from '@app/types/reference';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserObject } from './user.type';

@Resolver(() => UserObject)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveReference()
  resolveReference(reference: Reference<UserObject, 'username'>): UserObject {
    const user = this.userService.find(reference.username);
    return user;
  }

  @Query(() => [UserObject])
  users(): UserObject[] {
    return this.userService.all();
  }

  @ResolveField(() => String)
  fullName(@Parent() user: UserObject): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
