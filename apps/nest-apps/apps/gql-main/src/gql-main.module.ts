import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import pkgDir from 'pkg-dir';
import { ServicesModule } from '@app/services';
import { InfrastructureModule } from '@app/infrastructure';
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
    InfrastructureModule,
  ],
  providers: [MessageResolver],
})
export class GqlMainModule {}
