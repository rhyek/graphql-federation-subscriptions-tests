import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GqlSubscriptionsModule } from './gql-subscriptions.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GqlSubscriptionsModule,
    new FastifyAdapter(),
    { cors: true },
  );
  await app.listen(3002, '0.0.0.0');
  console.log('gql-subscriptions listening on port 3002.');
}
bootstrap();
