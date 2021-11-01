import path from 'path';
import { Module } from '@nestjs/common';
import { MercuriusModule } from 'nestjs-mercurius';
import pkgDir from 'pkg-dir';
import { ServicesModule } from '@app/services';
import { InfrastructureModule } from '@app/infrastructure';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [
    MercuriusModule.forRoot({
      autoSchemaFile: path.resolve(pkgDir.sync(), './apps/gql-main/schema.gql'),
      // autoSchemaFile: true,
      allowBatchedQueries: true,
      // subscription: true,
      federationMetadata: true,
    }),
    ServicesModule,
    InfrastructureModule,
  ],
  providers: [MessageResolver],
})
export class GqlMainModule {}
