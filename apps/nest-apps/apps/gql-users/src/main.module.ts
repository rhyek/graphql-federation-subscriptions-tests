import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import pkgDir from 'pkg-dir';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: path.resolve(
        pkgDir.sync(),
        './apps/gql-users/schema.gql',
      ),
      // installSubscriptionHandlers: true,
    }),
    UserModule,
  ],
})
export class GqlMainModule {}
