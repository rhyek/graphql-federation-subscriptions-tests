import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        serviceList: [
          { name: 'messages', url: 'http://localhost:3001/graphql' },
        ],
      },
    }),
  ],
})
export class GqlGatewayModule {}
