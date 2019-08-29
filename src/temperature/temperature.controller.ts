import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TemperatureRangeDto } from './dto/temperature-range.dto';
import { TemperatureService } from './service/temperature.service';

@Controller('temperature')
export class TemperatureController {

  constructor(private readonly service: TemperatureService) { }

  @Get('/range/beer-type/:type')
  public getBeerTemperatureRange(@Param('type') beerType: string): Observable<TemperatureRangeDto> {
    if (isNaN(Number(beerType))) {
      throw new HttpException('Param must be an integer number', 400);
    }
    return this.service.getTemperatureRange(parseInt(beerType, 10));
  }
}
