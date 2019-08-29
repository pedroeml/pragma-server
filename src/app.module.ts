import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';
import { SensorModule } from './sensor/sensor.module';
import { TemperatureModule } from './temperature/temperature.module';

@Module({
  imports: [ContainerModule, SensorModule, TemperatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
