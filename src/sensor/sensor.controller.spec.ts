import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureSensorDto } from './dto/temperature-sensor.dto';
import { SensorController } from './sensor.controller';
import { SensorService } from './service/sensor.service';
import { SensorServiceStub } from './service/sensor.service.stub';

describe('SensorController', () => {
  let controller: SensorController;
  let service: SensorService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SensorController],
      providers: [{ provide: SensorService, useClass: SensorServiceStub }],
    }).compile();

    controller = app.get<SensorController>(SensorController);
    service = app.get<SensorService>(SensorService);
  });

  describe('getSensorById', () => {
    const sensorId: string = '0';
    const temperature: number = 0;
    let response: TemperatureSensorDto;

    beforeEach(() => {
      spyOn(service, 'getSensorById').and.callThrough();
      controller.getSensorById(sensorId).subscribe(
        res => { response = res; },
      );
    });

    it('should call method getSensorById from service class', () => {
      expect(service.getSensorById).toHaveBeenCalledWith(sensorId);
    });

    it('should return the object from mock', () => {
      expect(response).not.toBeUndefined();
      expect(response.id).toBe(sensorId);
      expect(response.temperature).toBe(temperature);
    });
  });
});
