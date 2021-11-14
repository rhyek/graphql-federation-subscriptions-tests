import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import waitOn from 'wait-on';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => {
        const serviceList = [
          { name: 'all', baseUrl: 'http://localhost:3001' },
          { name: 'users', baseUrl: 'http://localhost:3002' },
        ].map((service) => ({
          ...service,
          url: `${service.baseUrl}/graphql`,
          healthcheck: `${service.baseUrl}/.well-known/apollo/server-health`,
        }));
        await waitOn({
          resources: serviceList.map((service) => service.healthcheck),
        });
        return {
          server: {
            // ... Apollo server options
            cors: true,
          },
          gateway: {
            serviceList,
          },
        };
      },
    }),
  ],
})
export class GqlGatewayModule {}
