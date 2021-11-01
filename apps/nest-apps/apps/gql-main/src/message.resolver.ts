import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  LoaderQuery,
  Reference,
  ResolveReferenceLoader,
} from 'nestjs-mercurius';
import { MessageService, UserService } from '@app/services';
import { Message, User, PubSub } from '@app/types';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private pubSub: PubSub,
  ) {}

  @Query(() => [Message])
  messages(): Promise<Message[]> {
    console.log('messages');
    return this.messageService.getAll();
  }

  @ResolveField(() => User)
  user(@Parent() parent: Message): User {
    const user = this.userService.find(parent.username);
    return user;
  }

  @Mutation(() => Boolean)
  async addMessage(
    @Args('from', { type: () => String }) from: string,
    @Args('message', { type: () => String }) message: string,
  ): Promise<boolean> {
    const msg = await this.messageService.addMessage(from, message);
    this.pubSub.publish('messageAdded', { messageAdded: msg });
    return true;
  }

  @ResolveReferenceLoader()
  resolveReference(refs: LoaderQuery<Reference<'Message', 'id'>>) {
    console.log('resolve reference', refs);
    return this.messageService.findById(refs.obj.id);
  }
}
