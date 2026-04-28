import { Module } from '@nestjs/common';
import { QuestionSplitterService } from './question-splitter.service';
import { DocumentFinderService } from './document-finder.service';
import { RankerService } from './ranker.service';
import { SummarizerService } from './summarizer.service';
import { CrossCheckerService } from './cross-checker.service';
import { FinalAnswerGeneratorService } from './final-answer-generator.service';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [DocumentsModule],
  providers: [
    QuestionSplitterService,
    DocumentFinderService,
    RankerService,
    SummarizerService,
    CrossCheckerService,
    FinalAnswerGeneratorService,
  ],
  exports: [
    QuestionSplitterService,
    DocumentFinderService,
    RankerService,
    SummarizerService,
    CrossCheckerService,
    FinalAnswerGeneratorService,
  ],
})
export class AgentsModule {}
