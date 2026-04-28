import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Query extends Document {
  @Prop({ required: true })
  question: string;
}

export const QuerySchema = SchemaFactory.createForClass(Query);
