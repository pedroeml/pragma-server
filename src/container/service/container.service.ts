import { Injectable } from '@nestjs/common';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ContainerDto } from '../dto/container.dto';
import { TemperatureRangeDto } from '../dto/temperature-range.dto';
import { BeerEnum } from '../enum/beer.enum';
import { IContainerResponse } from '../integration/container.response';
import { ContainerRestService } from './container-rest.service';

@Injectable()
export class ContainerService {

  constructor(private readonly restService: ContainerRestService) { }

  public getContainers(truckId: string): Observable<ContainerDto[]> {
    let truckContainers: IContainerResponse[];

    return this.restService.getContainers(truckId).pipe(
      tap(containers => { truckContainers = containers; }),
      map(containers => containers.map(container => container.beerType)),
      switchMap(beerTypes => this.getTemperatureRanges(beerTypes)),
      map(tempRanges => truckContainers.map(container => new ContainerDto(container, tempRanges.get(container.beerType)))),
    );
  }

  public getTemperatureRange(beerType: BeerEnum): Observable<TemperatureRangeDto> {
    return this.restService.getTemperatureRange(beerType).pipe(
      map(tempRange => new TemperatureRangeDto(tempRange)),
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

  private getTemperatureRanges(beerTypes: BeerEnum[]): Observable<Map<BeerEnum, TemperatureRangeDto>> {
    const uniqueBeerTypes: BeerEnum[] = [...new Set(beerTypes)];

    return of(uniqueBeerTypes).pipe(
      mergeMap(uniqueTypes => forkJoin(uniqueTypes.map(beerType => this.getTemperatureRangeEntry(beerType)))),
      map(entries => this.mergeTemperatureRangeEntries(entries)),
    );
  }
}
