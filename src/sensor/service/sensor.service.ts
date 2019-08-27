import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { TemperatureSensorDto } from '../dto/temperature-sensor.dto';
import { SensorRestService } from './sensor-rest.service';

@Injectable()
export class SensorService {

  constructor(private readonly restService: SensorRestService) { }

  public getSensorById(id: string): Observable<TemperatureSensorDto> {
    return this.restService.getOneById(id).pipe(
      map(res => new TemperatureSensorDto(res.data)),
      catchError((err: AxiosError) => { throw this.handleHttpError(err); }),
    );
  }

  private handleHttpError(err: AxiosError): HttpException {
    if (!isNullOrUndefined(err.response)) {
      return new HttpException(err.response.data, err.response.status);
    } else if (!isNullOrUndefined(err.request)) {
      return new HttpException(err.request, undefined);
    }

    return new HttpException(err.message, undefined);
  }
}
