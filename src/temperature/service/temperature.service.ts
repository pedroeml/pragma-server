import { Injectable } from '@nestjs/common';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BeerEnum } from '../../container/enum/beer.enum';
import { TemperatureRangeDto } from '../dto/temperature-range.dto';
import { TemperatureRestService } from './temperature-rest.service';

@Injectable()
export class TemperatureService {

  constructor(private readonly restService: TemperatureRestService) { }

  public getTemperatureRange(beerType: BeerEnum): Observable<TemperatureRangeDto> {
    return this.restService.getTemperatureRange(beerType).pipe(
      map(tempRange => new TemperatureRangeDto(tempRange)),
    );
  }

  public getTemperatureRanges(beerTypes: BeerEnum[]): Observable<Map<BeerEnum, TemperatureRangeDto>> {
    const uniqueBeerTypes: BeerEnum[] = [...new Set(beerTypes)];

    return of(uniqueBeerTypes).pipe(
      mergeMap(uniqueTypes => forkJoin(uniqueTypes.map(beerType => this.getTemperatureRangeEntry(beerType)))),
      map(entries => this.mergeTemperatureRangeEntries(entries)),
    );
  }

  private getTemperatureRangeEntry(beerType: BeerEnum): Observable<Map<BeerEnum, TemperatureRangeDto>> {
    return this.getTemperatureRange(beerType).pipe(
      map(tempRange => {
        const entry: Map<BeerEnum, TemperatureRangeDto> = new Map<BeerEnum, TemperatureRangeDto>();
        entry.set(beerType, tempRange);
        return entry;
      }),
    );
  }

  private mergeTemperatureRangeEntries(entries: Array<Map<BeerEnum, TemperatureRangeDto>>): Map<BeerEnum, TemperatureRangeDto> {
    const tempRanges: Map<BeerEnum, TemperatureRangeDto> = new Map<BeerEnum, TemperatureRangeDto>();

    entries.forEach(entry => {
      entry.forEach((tempRange, beerType) => {
        tempRanges.set(beerType, tempRange);
      });
    });

    return tempRanges;
  }
}
