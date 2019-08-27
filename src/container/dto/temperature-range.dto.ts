import { ITemperatureRangeResponse } from './../integration/temperature-range.response';

export class TemperatureRangeDto {
  public readonly minTemperature: number;
  public readonly maxTemperature: number;

  constructor(temperatureRange: ITemperatureRangeResponse) {
    this.minTemperature = temperatureRange.minTemperature;
    this.maxTemperature = temperatureRange.maxTemperature;
  }
}
