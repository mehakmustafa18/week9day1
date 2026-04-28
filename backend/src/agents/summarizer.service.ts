import { Injectable } from '@nestjs/common';

@Injectable()
export class SummarizerService {
  summarize(document: string, numSentences: number = 3): string {
    const sentences = document.split(/\.|\!|\?/).map(s => s.trim()).filter(s => s.length > 10);
    if (sentences.length <= numSentences) return sentences.join('. ') + '.';

    // Simple frequency-based scoring
    const words = document.toLowerCase().split(/\W+/);
    const freq = {};
    words.forEach(w => { if (w.length > 3) freq[w] = (freq[w] || 0) + 1; });

    const sentenceScores = sentences.map(s => {
      const sWords = s.toLowerCase().split(/\W+/);
      let score = 0;
      sWords.forEach(w => { score += (freq[w] || 0); });
      return { sentence: s, score: score / sWords.length };
    });

    return sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, numSentences)
      .map(s => s.sentence)
      .join('. ') + '.';
  }
}
