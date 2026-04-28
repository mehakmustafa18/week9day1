import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

export default async (req: any, res: any) => {
  try {
    const server = await bootstrap();
    return server(req, res);
  } catch (err) {
    console.error('❌ Vercel Handler Error:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
};
