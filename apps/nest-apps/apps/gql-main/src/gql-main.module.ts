import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import pkgDir from 'pkg-dir';
import { ServicesModule } from '@app/services';
import { InfrastructureModule } from '@app/infrastructure';
import { MessageResolver } from './message.resolver';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    ServicesModule,
    InfrastructureModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(pkgDir.sync(), './apps/gql-main/schema.gql'),
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [MessageResolver, UserResolver],
})
export class GqlMainModule {}
