import { Module } from '@nestjs/common';
import { ContainerController } from './container.controller';
import { ContainerRestService } from './service/container-rest.service';
import { ContainerService } from './service/container.service';
import { FakeTemperatureRangeResponseFactory } from './service/factory/fake-temperature-range-response.factory';

@Module({
  imports: [],
  controllers: [ContainerController],
  providers: [ContainerService, ContainerRestService, FakeTemperatureRangeResponseFactory],
})
export class ContainerModule {}
