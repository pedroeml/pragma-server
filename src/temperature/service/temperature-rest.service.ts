import { HttpException, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { BeerEnum } from '../../container/enum/beer.enum';
import { FakeTemperatureRangeResponseFactory } from '../factory/fake-temperature-range-response.factory';
import { ITemperatureRangeResponse } from '../integration/temperature-range.response';

@Injectable()
export class TemperatureRestService {

  constructor(private readonly factory: FakeTemperatureRangeResponseFactory) { }

  public getTemperatureRange(beerType: BeerEnum): Observable<ITemperatureRangeResponse> {
    return of(this.factory.create(beerType)).pipe(
      map(tempRange => {
        if (isNullOrUndefined(tempRange)) {
          throw new HttpException('Not Found', 404);
        }

        return tempRange;
      }),
    );
  }
}
