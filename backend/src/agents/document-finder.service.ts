import { Injectable } from '@nestjs/common';
import { DocumentsService } from '../documents/documents.service';

@Injectable()
export class DocumentFinderService {
  constructor(private readonly documentsService: DocumentsService) {}

  async find(subQuestions: string[]) {
    // Extract keywords (simple: remove common stop words)
    const stopWords = ['what', 'is', 'the', 'how', 'does', 'a', 'an', 'in', 'on', 'with', 'who', 'where', 'why'];
    const allKeywords = subQuestions.flatMap(q => 
      q.toLowerCase()
       .replace(/[^\w\s]/g, '')
       .split(/\s+/)
       .filter(word => word.length > 2 && !stopWords.includes(word))
    );
    
    const uniqueKeywords = Array.from(new Set(allKeywords));
    const docs = await this.documentsService.search(uniqueKeywords);
    return docs;
  }
}
