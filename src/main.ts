import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getDatabaseUrl from "./common/database/database";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("SA")
  getDatabaseUrl()
}
bootstrap();
