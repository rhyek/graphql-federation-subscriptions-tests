import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => {
        return {
          server: {
            // ... Apollo server options
            cors: true,
          },
          gateway: {
            serviceList: [
              { name: 'all', url: 'http://localhost:3001/graphql' },
            ],
          },
        };
      },
    }),
  ],
})
export class GqlGatewayModule {}
