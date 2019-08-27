import { Injectable } from '@nestjs/common';
import keys from '../constants/keys';

@Injectable()
export class ConfigService {

  public getTemperatureSensorServerUrl(): string {
    return keys.TEMPERATURE_SENSOR_SERVER;
  }
}
