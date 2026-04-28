import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionSplitterService {
  split(question: string): string[] {
    // Split by common conjunctions or punctuation
    const subQuestions = question
      .split(/\.|\?| and | also | but | as well as /i)
      .map(s => s.trim())
      .filter(s => s.length > 5); // Simple heuristic to avoid tiny fragments
    
    return subQuestions.length > 0 ? subQuestions : [question];
  }
}
