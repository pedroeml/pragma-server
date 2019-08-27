import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [ContainerModule, SensorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
