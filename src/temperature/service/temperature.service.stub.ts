import { Observable, of } from 'rxjs';
import { BeerEnum } from '../../container/enum/beer.enum';
import { TemperatureRangeDto } from '../dto/temperature-range.dto';
import { ITemperatureRangeResponse } from '../integration/temperature-range.response';

export class TemperatureServiceStub {
  public getTemperatureRange(beerType: BeerEnum): Observable<TemperatureRangeDto> {
    const irange: ITemperatureRangeResponse = { minTemperature: 0, maxTemperature: 0 };
    const range: TemperatureRangeDto = new TemperatureRangeDto(irange);

    return of(range);
  }
}
