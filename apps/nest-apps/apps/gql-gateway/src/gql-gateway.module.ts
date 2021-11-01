import { Module } from '@nestjs/common';
import { MercuriusGatewayModule } from 'nestjs-mercurius';

@Module({
  imports: [
    MercuriusGatewayModule.forRoot({
      graphiql: true,
      subscription: true,
      allowBatchedQueries: true,
      gateway: {
        pollingInterval: 10000,
        services: [
          {
            name: 'messages',
            url: 'http://localhost:3001/graphql',
            wsUrl: 'ws://localhost:3001/graphql',
          },
          // {
          //   name: 'subscriptions',
          //   url: 'http://localhost:3002/graphql',
          //   wsUrl: 'ws://localhost:3002/graphql',
          //   // rewriteHeaders: headers => headers,,
          // },
        ],
      },
    }),
  ],
})
export class GqlGatewayModule {}
