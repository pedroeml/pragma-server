import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SensorController } from './sensor.controller';
import { SensorRestService } from './service/sensor-rest.service';
import { SensorService } from './service/sensor.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [SensorController],
  providers: [SensorService, SensorRestService],
})
export class SensorModule {}
