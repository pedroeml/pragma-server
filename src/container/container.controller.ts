import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContainerDto } from './dto/container.dto';
import { TemperatureRangeDto } from './dto/temperature-range.dto';
import { ContainerService } from './service/container.service';

@Controller('container')
export class ContainerController {

  constructor(private readonly service: ContainerService) { }

  @Get(':id')
  public getTruckContainers(@Param('id') truckId: string): Observable<ContainerDto[]> {
    return this.service.getContainers(truckId);
  }

  @Get('/temp-range/:type')
  public getBeerTemperatureRange(@Param('type') beerType: string): Observable<TemperatureRangeDto> {
    if (isNaN(Number(beerType))) {
      throw new HttpException('Param must be an integer number', 400);
    }
    return this.service.getTemperatureRange(parseInt(beerType, 10));
  }
}
