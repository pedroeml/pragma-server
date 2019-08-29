import { Observable, of } from 'rxjs';
import { TemperatureSensorDto } from '../dto/temperature-sensor.dto';
import { ITemperatureSensorResponse } from '../integration/temperature-sensor.response';

export class SensorServiceStub {
  public getSensorById(sensorId: string): Observable<TemperatureSensorDto> {
    const isensor: ITemperatureSensorResponse = { id: sensorId, temperature: 0 };
    const sensor: TemperatureSensorDto = new TemperatureSensorDto(isensor);

    return of(sensor);
  }
}
