import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Конфігурація Swagger
  const config = new DocumentBuilder()
    .setTitle('EventFlow API')
    .setDescription('The API description for EventFlow microservices')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Шлях, за яким буде доступна документація (наприклад, http://localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
