import { TemperatureRangeDto } from '../../temperature/dto/temperature-range.dto';
import { BeerEnum } from '../enum/beer.enum';
import { IContainerResponse } from '../integration/container.response';

export class ContainerDto {
  public readonly id: string;
  public readonly beerType: BeerEnum;
  public readonly temperatureRange: TemperatureRangeDto;

  constructor(container: IContainerResponse, temperatureRange: TemperatureRangeDto) {
    this.id = container.id;
    this.beerType = container.beerType;
    this.temperatureRange = temperatureRange;
  }
}
