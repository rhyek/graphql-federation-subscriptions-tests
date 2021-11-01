import path from 'path';
import { Module } from '@nestjs/common';
import { MercuriusModule } from 'nestjs-mercurius';
import pkgDir from 'pkg-dir';
import { ServicesModule } from '@app/services';
import { InfrastructureModule } from '@app/infrastructure';
import { MessageResolver } from './message.resolver';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    ServicesModule,
    InfrastructureModule,
    MercuriusModule.forRoot({
      autoSchemaFile: path.resolve(pkgDir.sync(), './apps/gql-main/schema.gql'),
      allowBatchedQueries: true,
      federationMetadata: true,
      // subscription: true,
    }),
  ],
  providers: [MessageResolver, UserResolver],
})
export class GqlMainModule {}
