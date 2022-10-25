import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  new Swagger(app).createDocument();
  app.enableCors();
  await app.listen(8080);
  console.log('SA');
}
bootstrap();
