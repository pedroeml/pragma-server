import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureRangeDto } from './dto/temperature-range.dto';
import { TemperatureService } from './service/temperature.service';
import { TemperatureServiceStub } from './service/temperature.service.stub';
import { TemperatureController } from './temperature.controller';

describe('TemperatureController', () => {
  let controller: TemperatureController;
  let service: TemperatureService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TemperatureController],
      providers: [{ provide: TemperatureService, useClass: TemperatureServiceStub }],
    }).compile();

    controller = app.get<TemperatureController>(TemperatureController);
    service = app.get<TemperatureService>(TemperatureService);
  });

  describe('getSensorById', () => {
    const beerType: string = '1';
    const temperature: number = 0;
    let response: TemperatureRangeDto;

    beforeEach(() => {
      spyOn(service, 'getTemperatureRange').and.callThrough();
      controller.getBeerTemperatureRange(beerType).subscribe(
        res => { response = res; },
      );
    });

    it('should call method getTemperatureRange from service class', () => {
      expect(service.getTemperatureRange).toHaveBeenCalledWith(parseInt(beerType, 10));
    });

    it('should return the object from mock', () => {
      expect(response).not.toBeUndefined();
      expect(response.minTemperature).toBe(temperature);
      expect(response.maxTemperature).toBe(temperature);
    });
  });
});
