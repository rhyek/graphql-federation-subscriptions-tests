import { Module } from '@nestjs/common';
import { MercuriusModule } from 'nestjs-mercurius';
import path from 'path';
import pkgDir from 'pkg-dir';
import { InfrastructureModule } from '@app/infrastructure';
import { Message, MessageResolver } from './message.resolver';

@Module({
  imports: [
    InfrastructureModule,
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
  ],
  providers: [MessageResolver],
})
export class GqlSubscriptionsModule {}
