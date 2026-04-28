import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ResearchService } from './research.service';

@Controller()
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Post('ask')
  async ask(@Body('question') question: string) {
    return this.researchService.runPipeline(question);
  }

  @Get('trace/:id')
  async getTrace(@Param('id') id: string) {
    return this.researchService.getTrace(id);
  }

  @Get('history')
  async getHistory() {
    return this.researchService.getHistory();
  }
}
