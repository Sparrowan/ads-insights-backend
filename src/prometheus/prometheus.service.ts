import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class PrometheusService {
  private impressionsCounter: Counter<string>;

  constructor() {
    // Check if the metric already exists
    const existingMetric = register.getSingleMetric('ads_impressions');

    if (existingMetric) {
      this.impressionsCounter = existingMetric as Counter<string>;
    } else {
      this.impressionsCounter = new Counter({
        name: 'ads_impressions',
        help: 'Number of impressions',
        labelNames: ['date', 'impressions'],
      });
    }
  }

  setImpressions(date: string, count: number) {
    this.impressionsCounter.labels(date, count.toString()).inc();
  }

  async getMetrics() {
    return register.metrics();
  }

  getContentType() {
    return register.contentType;
  }
}
