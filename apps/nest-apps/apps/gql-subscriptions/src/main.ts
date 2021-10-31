import { NestFactory } from '@nestjs/core';
import { GqlSubscriptionsModule } from './gql-subscriptions.module';

async function bootstrap() {
  const app = await NestFactory.create(GqlSubscriptionsModule);
  await app.listen(3002);
}
bootstrap();
