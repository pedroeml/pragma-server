import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TemperatureService } from '../../temperature/service/temperature.service';
import { ContainerDto } from '../dto/container.dto';
import { IContainerResponse } from '../integration/container.response';
import { ContainerRestService } from './container-rest.service';

@Injectable()
export class ContainerService {

  constructor(
    private readonly restService: ContainerRestService,
    private readonly temperatureService: TemperatureService) { }

  public getContainers(truckId: string): Observable<ContainerDto[]> {
    let truckContainers: IContainerResponse[];

    return this.restService.getContainers(truckId).pipe(
      tap(containers => { truckContainers = containers; }),
      map(containers => containers.map(container => container.beerType)),
      switchMap(beerTypes => this.temperatureService.getTemperatureRanges(beerTypes)),
      map(tempRanges => truckContainers.map(container => new ContainerDto(container, tempRanges.get(container.beerType)))),
    );
  }
}
