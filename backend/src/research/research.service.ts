import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from '../schemas/query.schema';
import { Trace } from '../schemas/trace.schema';
import { QuestionSplitterService } from '../agents/question-splitter.service';
import { DocumentFinderService } from '../agents/document-finder.service';
import { RankerService } from '../agents/ranker.service';
import { SummarizerService } from '../agents/summarizer.service';
import { CrossCheckerService } from '../agents/cross-checker.service';
import { FinalAnswerGeneratorService } from '../agents/final-answer-generator.service';

@Injectable()
export class ResearchService {
  constructor(
    @InjectModel(Query.name) private queryModel: Model<Query>,
    @InjectModel(Trace.name) private traceModel: Model<Trace>,
    private splitter: QuestionSplitterService,
    private finder: DocumentFinderService,
    private ranker: RankerService,
    private summarizer: SummarizerService,
    private crossChecker: CrossCheckerService,
    private generator: FinalAnswerGeneratorService,
  ) {}

  async runPipeline(question: string) {
    const steps: any[] = [];
    const query = await new this.queryModel({ question }).save();
    
    // 1. Split
    const subQuestions = this.splitter.split(question);
    steps.push({ step: 'Question Splitter', result: subQuestions, timestamp: new Date() });

    // 2. Find
    const docs = await this.finder.find(subQuestions);
    steps.push({ step: 'Document Finder', result: `${docs.length} documents found`, timestamp: new Date() });

    if (docs.length === 0) {
      const finalAnswer = "The answer is not found in the document content";
      const trace = await new this.traceModel({
        queryId: query._id,
        question,
        steps,
        docsUsed: [],
        contradictions: [],
        finalAnswer
      }).save();

      return {
        queryId: query._id,
        traceId: trace._id,
        finalAnswer,
        trace
      };
    }

    // 3. Rank
    const rankedDocs = await this.ranker.rank(question, docs);
    steps.push({ step: 'Ranker', result: rankedDocs.map(d => d.title), timestamp: new Date() });

    if (rankedDocs.length === 0) {
      const finalAnswer = "The answer is not found in the document content (no relevant matches found).";
      const trace = await new this.traceModel({
        queryId: query._id,
        question,
        steps,
        docsUsed: [],
        contradictions: [],
        finalAnswer
      }).save();

      return {
        queryId: query._id,
        traceId: trace._id,
        finalAnswer,
        trace
      };
    }

    // 4. Summarize
    const summaries = rankedDocs.slice(0, 3).map(doc => this.summarizer.summarize(doc.content));
    steps.push({ step: 'Summarizer', result: summaries, timestamp: new Date() });

    // 5. Cross-Check
    const contradictions = this.crossChecker.check(summaries);
    steps.push({ step: 'Cross-Checker', result: contradictions, timestamp: new Date() });

    // 6. Final Answer
    const finalAnswer = this.generator.generate(summaries, contradictions, rankedDocs.map(d => d.title));
    steps.push({ step: 'Final Answer Generator', result: 'Generated', timestamp: new Date() });

    const trace = await new this.traceModel({
      queryId: query._id,
      question,
      steps,
      docsUsed: rankedDocs.map(d => d.title),
      contradictions,
      finalAnswer
    }).save();

    return {
      queryId: query._id,
      traceId: trace._id,
      finalAnswer,
      trace
    };
  }

  async getTrace(id: string) {
    return this.traceModel.findById(id).exec();
  }

  async getHistory() {
    return this.traceModel.find().sort({ createdAt: -1 }).limit(10).exec();
  }
}
