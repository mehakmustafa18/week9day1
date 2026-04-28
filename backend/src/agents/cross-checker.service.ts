import { Injectable } from '@nestjs/common';

@Injectable()
export class CrossCheckerService {
  check(summaries: string[]): string[] {
    const contradictions: string[] = [];
    // Basic logic: look for "not", "never", "no" vs affirmative in sentences with same keywords
    // This is a placeholder for more complex logic.
    // For now, let's do a simple keyword overlap with negation check.
    
    for (let i = 0; i < summaries.length; i++) {
      for (let j = i + 1; j < summaries.length; j++) {
        const s1 = summaries[i].toLowerCase();
        const s2 = summaries[j].toLowerCase();
        
        // Find common nouns/keywords
        const words1 = s1.split(/\W+/).filter(w => w.length > 5);
        const words2 = s2.split(/\W+/).filter(w => w.length > 5);
        const common = words1.filter(w => words2.includes(w));
        
        if (common.length >= 2) {
          const hasNegation1 = /\b(not|never|no|none|neither)\b/.test(s1);
          const hasNegation2 = /\b(not|never|no|none|neither)\b/.test(s2);
          
          if (hasNegation1 !== hasNegation2) {
            contradictions.push(`Potential contradiction regarding "${common.join(', ')}" between sources.`);
          }
        }
      }
    }
    
    return Array.from(new Set(contradictions));
  }
}
