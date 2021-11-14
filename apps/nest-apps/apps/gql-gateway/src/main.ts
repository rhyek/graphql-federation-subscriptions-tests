import { NestFactory } from '@nestjs/core';
import { GqlGatewayModule } from './gql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GqlGatewayModule);
  await app.listen(3000);
  console.log('gql-gateway listening on http://localhost:3000');
}
bootstrap();
