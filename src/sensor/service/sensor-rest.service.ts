import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/service/config.service';
import { ITemperatureSensorResponse } from '../integration/temperature-sensor.response';

@Injectable()
export class SensorRestService {

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService) { }

  public getOneById(id: string): Observable<AxiosResponse<ITemperatureSensorResponse>> {
    return this.http.get<ITemperatureSensorResponse>(`${this.config.getTemperatureSensorServerUrl()}/sensor/${id}`);
  }
}
