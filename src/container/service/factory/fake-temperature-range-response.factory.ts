import { Injectable } from '@nestjs/common';
import { BeerEnum } from '../../enum/beer.enum';
import { ITemperatureRangeResponse } from '../../integration/temperature-range.response';

@Injectable()
export class FakeTemperatureRangeResponseFactory {

  public create(beerType: BeerEnum): ITemperatureRangeResponse {
    switch (beerType) {
      case BeerEnum.PILSNER:
        return { minTemperature: 4, maxTemperature: 6 };
      case BeerEnum.IPA:
        return { minTemperature: 5, maxTemperature: 6 };
      case BeerEnum.LAGER:
        return { minTemperature: 4, maxTemperature: 7 };
      case BeerEnum.STOUT:
        return { minTemperature: 6, maxTemperature: 8 };
      case BeerEnum.WHEAT_BEER:
        return { minTemperature: 3, maxTemperature: 5 };
      case BeerEnum.PALE_ALE:
        return { minTemperature: 4, maxTemperature: 6 };
      default:
        return undefined;
    }
  }
}
