import { Module } from '@nestjs/common';
import { TemperatureModule } from '../temperature/temperature.module';
import { ContainerController } from './container.controller';
import { ContainerRestService } from './service/container-rest.service';
import { ContainerService } from './service/container.service';

@Module({
  imports: [TemperatureModule],
  controllers: [ContainerController],
  providers: [ContainerService, ContainerRestService],
})
export class ContainerModule {}
