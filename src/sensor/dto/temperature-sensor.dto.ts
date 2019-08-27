import { ITemperatureSensorResponse } from '../integration/temperature-sensor.response';

export class TemperatureSensorDto {
  public readonly id: string;
  public readonly temperature: number;

  constructor(tempSensor: ITemperatureSensorResponse) {
    this.id = tempSensor.id;
    this.temperature = tempSensor.temperature;
  }
}
