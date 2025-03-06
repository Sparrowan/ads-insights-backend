import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrometheusService } from './prometheus.service';

@Controller()
export class MetricsController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get('/metrics')
  async getMetrics(@Res() res: Response) {
    const metrics = await this.prometheusService.getMetrics();
    res.set('Content-Type', this.prometheusService.getContentType());
    res.send(metrics);
  }
}
