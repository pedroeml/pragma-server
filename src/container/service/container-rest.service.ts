import { HttpException, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { BeerEnum } from '../enum/beer.enum';
import { IContainerResponse } from '../integration/container.response';
import { ITemperatureRangeResponse } from '../integration/temperature-range.response';
import { FakeTemperatureRangeResponseFactory } from './factory/fake-temperature-range-response.factory';

@Injectable()
export class ContainerRestService {

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

  public getContainers(truckId: string): Observable<IContainerResponse[]> {
    return of(this.getFakeContainerCollection().get(truckId)).pipe(
      map(containers => {
        if (isNullOrUndefined(containers) || containers.length === 0) {
          throw new HttpException('Not Found', 404);
        }

        return containers;
      }),
    );
  }

  private getFakeContainerCollection(): Map<string, IContainerResponse[]> {
    const containers: Map<string, IContainerResponse[]> = new Map<string, IContainerResponse[]>();

    containers.set('0', [{
      id: '01',
      beerType: BeerEnum.PILSNER,
    }, {
      id: '02',
      beerType: BeerEnum.IPA,
    }, {
      id: '03',
      beerType: BeerEnum.LAGER,
    }]);
    containers.set('1', [{
      id: '11',
      beerType: BeerEnum.STOUT,
    }, {
      id: '12',
      beerType: BeerEnum.WHEAT_BEER,
    }, {
      id: '13',
      beerType: BeerEnum.PALE_ALE,
    }]);

    return containers;
  }
}
