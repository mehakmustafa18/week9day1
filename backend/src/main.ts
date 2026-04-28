import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const expressInstance = express.default ? (express as any).default() : (express as any)();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
    app.enableCors();
    await app.init();
    cachedServer = expressInstance;
  }
  return cachedServer;
}

// Export for Vercel
export default async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};
