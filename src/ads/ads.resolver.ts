import { Resolver, Query } from '@nestjs/graphql';
import { AdsService } from './ads.service';
import { AdsInsightsResponse } from './ads.dto';

@Resolver()
export class AdsResolver {
  constructor(private readonly adsService: AdsService) {}

  @Query(() => AdsInsightsResponse)
  getAdsInsights(): Promise<AdsInsightsResponse> {
    return this.adsService.getAdsInsights();
  }
}
