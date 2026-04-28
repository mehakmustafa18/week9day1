import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Trace extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Query' })
  queryId: string;

  @Prop()
  question: string;

  @Prop({ type: [{ step: String, result: MongooseSchema.Types.Mixed, timestamp: Date }] })
  steps: { step: string; result: any; timestamp: Date }[];

  @Prop({ type: [String] })
  docsUsed: string[];

  @Prop({ type: [String] })
  contradictions: string[];

  @Prop()
  finalAnswer: string;
}

export const TraceSchema = SchemaFactory.createForClass(Trace);
