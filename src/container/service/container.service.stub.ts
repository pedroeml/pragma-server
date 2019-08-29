import { Observable, of } from 'rxjs';
import { TemperatureRangeDto } from '../../temperature/dto/temperature-range.dto';
import { ITemperatureRangeResponse } from '../../temperature/integration/temperature-range.response';
import { ContainerDto } from '../dto/container.dto';
import { IContainerResponse } from '../integration/container.response';

export class ContainerServiceStub {
  public getContainers(truckId: string): Observable<ContainerDto[]> {
    const irange: ITemperatureRangeResponse = { minTemperature: 0, maxTemperature: 0 };
    const range: TemperatureRangeDto = new TemperatureRangeDto(irange);
    const icontainer: IContainerResponse = { id: '0', beerType: 1 };
    const container: ContainerDto = new ContainerDto(icontainer, range);

    return of([container]);
  }
}
