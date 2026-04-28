import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ResearchDocument extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  content: string;
}

export const ResearchDocumentSchema = SchemaFactory.createForClass(ResearchDocument);
ResearchDocumentSchema.index({ content: 'text', title: 'text', topic: 'text' });
