import { Injectable } from '@nestjs/common';
import * as natural from 'natural';

@Injectable()
export class RankerService {
  rank(query: string, documents: any[]) {
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    documents.forEach(doc => {
      tfidf.addDocument(doc.content);
    });

    const scores: { index: number; score: number; doc: any }[] = [];
    tfidf.tfidfs(query, (i, score) => {
      scores.push({ index: i, score, doc: documents[i] });
    });

    return scores
      .sort((a, b) => b.score - a.score)
      .map(s => s.doc);
  }
}
