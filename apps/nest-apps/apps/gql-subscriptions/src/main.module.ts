import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@app/infrastructure';
import { EventResolver } from './event.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import pkgDir from 'pkg-dir';

@Module({
  imports: [
    InfrastructureModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(
        pkgDir.sync(),
        './apps/gql-subscriptions/schema.gql',
      ),
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [EventResolver],
})
export class GqlMainModule {}
