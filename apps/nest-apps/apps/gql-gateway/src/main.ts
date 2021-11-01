import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GqlGatewayModule } from './gql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GqlGatewayModule,
    new FastifyAdapter(),
    { cors: true },
  );
  await app.listen(3000, '0.0.0.0');
  console.log('gql-gateway listening on port 3000.');
}
bootstrap();
