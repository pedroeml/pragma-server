import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TemperatureSensorDto } from './dto/temperature-sensor.dto';
import { SensorService } from './service/sensor.service';

@Controller('sensor')
export class SensorController {

  constructor(private readonly service: SensorService) { }

  @Get(':id')
  public getSensorById(@Param('id') id: string): Observable<TemperatureSensorDto> {
    return this.service.getSensorById(id);
  }
}
