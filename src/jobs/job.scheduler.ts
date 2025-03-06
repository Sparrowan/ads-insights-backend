import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AdsService } from '../ads/ads.service';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class JobScheduler {
  private readonly logger = new Logger(JobScheduler.name);
  constructor(
    private adsService: AdsService,
    private prometheusService: PrometheusService,
  ) {}

  // Run every 5 minutes
  @Cron('*/5 * * * * *') // Runs every 5 seconds
  async collectMetrics() {
    this.logger.log('Fetching Ads Insights and storing in Prometheus');

    try {
      // Fetch data from AdsService
      const insights = await this.adsService.getAdsInsights();

      // Store impressions in Prometheus
      insights.data.forEach((ad) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        this.prometheusService.setImpressions(ad.date_start, ad.impressions);
      });

      this.logger.log('Successfully updated Prometheus metrics');
    } catch (error) {
      this.logger.error('Failed to update Prometheus metrics', error);
    }
  }
}
