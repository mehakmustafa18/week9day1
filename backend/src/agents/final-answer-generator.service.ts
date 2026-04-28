import { Injectable } from '@nestjs/common';

@Injectable()
export class FinalAnswerGeneratorService {
  generate(summaries: string[], contradictions: string[], docsUsed: string[]): string {
    let answer = "### Summary of Findings\n\n";
    answer += summaries.join('\n\n');
    
    if (contradictions.length > 0) {
      answer += "\n\n### Potential Contradictions Detected\n";
      contradictions.forEach(c => answer += `- ${c}\n`);
    }
    
    answer += `\n\n### Sources Used\n- ${docsUsed.join('\n- ')}`;
    
    return answer;
  }
}
