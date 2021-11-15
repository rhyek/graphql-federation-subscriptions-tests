import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import pkgDir from 'pkg-dir';
import { MessageModule } from './message/message.module';
import { UserObject } from './message/user.type';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: path.resolve(
        pkgDir.sync(),
        './apps/gql-messages/schema.gql',
      ),
      // installSubscriptionHandlers: true,
      buildSchemaOptions: {
        orphanedTypes: [UserObject],
      },
    }),
    MessageModule,
  ],
})
export class GqlMainModule {}
