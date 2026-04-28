import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';
import { AgentsModule } from '../agents/agents.module';
import { Query, QuerySchema } from '../schemas/query.schema';
import { Trace, TraceSchema } from '../schemas/trace.schema';

@Module({
  imports: [
    AgentsModule,
    MongooseModule.forFeature([
      { name: Query.name, schema: QuerySchema },
      { name: Trace.name, schema: TraceSchema },
    ]),
  ],
  controllers: [ResearchController],
  providers: [ResearchService],
})
export class ResearchModule {}
