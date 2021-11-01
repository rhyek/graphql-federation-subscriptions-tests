import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GqlMainModule } from './gql-main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GqlMainModule,
    new FastifyAdapter(),
    { cors: true },
  );
  await app.listen(3001, '0.0.0.0');
  console.log('gql-main listening on localhost:3001');
}
bootstrap();
