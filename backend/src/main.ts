import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3001;
  await app.listen(port);
  return app;
}

// For Vercel Serverless
export default bootstrap();

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
