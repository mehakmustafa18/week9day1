import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResearchDocument } from '../schemas/document.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(ResearchDocument.name) private documentModel: Model<ResearchDocument>,
  ) {}

  async create(createDocumentDto: { title: string; topic: string; content: string }) {
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async findAll() {
    return this.documentModel.find().exec();
  }

  async search(keywords: string[]) {
    // Simple keyword match if text search is not ready or complex
    // For now, use regex for each keyword or simple text search if enabled
    return this.documentModel.find({
      $or: keywords.map(kw => ({
        content: { $regex: kw, $options: 'i' }
      }))
    }).exec();
  }
}
