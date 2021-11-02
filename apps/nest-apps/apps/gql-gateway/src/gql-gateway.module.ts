import { Module } from '@nestjs/common';
import { MercuriusGatewayModule } from 'nestjs-mercurius';

@Module({
  imports: [
    MercuriusGatewayModule.forRootAsync({
      useFactory: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5_000));
        return {
          graphiql: true,
          subscription: true,
          allowBatchedQueries: true,
          gateway: {
            pollingInterval: 1_000,
            services: [
              {
                name: 'subscriptions',
                url: 'http://localhost:3002/graphql',
                wsUrl: 'ws://localhost:3002/graphql',
                mandatory: true,
              },
              {
                name: 'messages',
                url: 'http://localhost:3001/graphql',
                // wsUrl: 'ws://localhost:3001/graphql',
                mandatory: true,
              },
            ],
          },
        };
      },
    }),
  ],
})
export class GqlGatewayModule {}
