import { Module } from '@nestjs/common';
import { MercuriusModule } from 'nestjs-mercurius';
import path from 'path';
import pkgDir from 'pkg-dir';
import { InfrastructureModule } from '@app/infrastructure';
import { TestResolver } from './test.resolver';
import { Message } from '@app/types';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [
    MercuriusModule.forRoot({
      autoSchemaFile: path.resolve(
        pkgDir.sync(),
        './apps/gql-subscriptions/schema.gql',
      ),
      buildSchemaOptions: {
        orphanedTypes: [Message],
      },
      allowBatchedQueries: true,
      subscription: true,
      federationMetadata: true,
    }),
    InfrastructureModule,
  ],
  providers: [TestResolver, MessageResolver],
})
export class GqlSubscriptionsModule {}
