import { join } from 'path';
import * as dotenv from 'dotenv';

// process.cwd() — це корінь всього проекту, де ти запускаєш npm run
dotenv.config({ path: join(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 3002;
  await app.listen(port);
}
void bootstrap();
