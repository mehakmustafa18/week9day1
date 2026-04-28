import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResearchDocument, ResearchDocumentSchema } from './schemas/document.schema';
import { Query, QuerySchema } from './schemas/query.schema';
import { Trace, TraceSchema } from './schemas/trace.schema';
import { DocumentsModule } from './documents/documents.module';
import { ResearchModule } from './research/research.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: ResearchDocument.name, schema: ResearchDocumentSchema },
      { name: Query.name, schema: QuerySchema },
      { name: Trace.name, schema: TraceSchema },
    ]),
    DocumentsModule,
    ResearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
