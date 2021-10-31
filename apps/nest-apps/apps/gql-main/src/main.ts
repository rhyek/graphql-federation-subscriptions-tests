import { NestFactory } from '@nestjs/core';
import { GqlMainModule } from './gql-main.module';

async function bootstrap() {
  const app = await NestFactory.create(GqlMainModule);
  await app.listen(3001);
  console.log('gql-main listening on localhost:3001');
}
bootstrap();
