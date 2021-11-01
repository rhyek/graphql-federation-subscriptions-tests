import { User } from '@app/types';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  @ResolveField(() => String)
  fullName(@Parent() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
