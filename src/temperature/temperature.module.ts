import { Module } from '@nestjs/common';
import { FakeTemperatureRangeResponseFactory } from './factory/fake-temperature-range-response.factory';
import { TemperatureRestService } from './service/temperature-rest.service';
import { TemperatureService } from './service/temperature.service';
import { TemperatureController } from './temperature.controller';

@Module({
  imports: [],
  controllers: [TemperatureController],
  providers: [TemperatureService, TemperatureRestService, FakeTemperatureRangeResponseFactory],
  exports: [TemperatureService],
})
export class TemperatureModule {}
