import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { ServicesModule } from '@app/services';
import pkgDir from 'pkg-dir';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // GraphQLFederationModule.forRoot({
      // still works directly
      autoSchemaFile: path.resolve(pkgDir.sync(), './apps/gql-main/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    ServicesModule,
  ],
  providers: [MessageResolver],
})
export class GqlMainModule {}
