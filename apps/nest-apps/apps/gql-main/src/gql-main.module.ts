import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import pkgDir from 'pkg-dir';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(pkgDir.sync(), './apps/gql-main/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    UserModule,
    MessageModule,
  ],
})
export class GqlMainModule {}
