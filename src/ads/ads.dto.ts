import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AdsInsights {
  @Field()
  impressions: number;
  @Field()
  date_start: string;

  @Field()
  date_stop: string;
}

@ObjectType()
export class Cursors {
  @Field()
  before: string;

  @Field()
  after: string;
}

@ObjectType()
export class Paging {
  @Field(() => Cursors)
  cursors: Cursors;
}

@ObjectType()
export class AdsInsightsResponse {
  @Field(() => [AdsInsights])
  data: AdsInsights[];

  @Field(() => Paging)
  paging: Paging;
}
