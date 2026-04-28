import { Controller, Post, Body, Get } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('upload')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async upload(@Body() createDocumentDto: { title: string; topic: string; content: string }) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  async getAll() {
    return this.documentsService.findAll();
  }
}
