import { NestFactory } from '@nestjs/core';
import { GqlMainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(GqlMainModule);
  const port = 3001;
  await app.listen(port);
  console.log(`gql-messages listening on http://localhost:${port}`);
}
bootstrap();
