import { Injectable } from '@nestjs/common';

@Injectable()
export class RankerService {
  async rank(query: string, documents: any[]): Promise<any[]> {
    if (!documents || documents.length === 0) return [];

    const queryTerms = query.toLowerCase().split(/\s+/);
    const scores: { index: number; score: number; doc: any }[] = [];

    // Simple TF-IDF implementation
    documents.forEach((doc, i) => {
      let score = 0;
      const content = (doc.content || '').toLowerCase();
      
      queryTerms.forEach(term => {
        // Escape special characters in the term for use in RegExp
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Term Frequency (TF): How many times the term appears in this doc
        const occurrences = (content.match(new RegExp(escapedTerm, 'g')) || []).length;
        if (occurrences > 0) {
          // Inverse Document Frequency (IDF) - simplified for local docs
          // We give more weight to terms that are found in fewer documents
          const docsWithTerm = documents.filter(d => (d.content || '').toLowerCase().includes(term)).length;
          const idf = Math.log(documents.length / (1 + docsWithTerm)) + 1;
          
          score += occurrences * idf;
        }
      });

      scores.push({ index: i, score, doc });
    });

    // Sort by score descending and return top docs
    return scores
      .sort((a, b) => b.score - a.score)
      .filter(s => s.score > 0)
      .map(s => s.doc);
  }
}
