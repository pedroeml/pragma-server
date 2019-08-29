import { Test, TestingModule } from '@nestjs/testing';
import { ContainerController } from './container.controller';
import { ContainerDto } from './dto/container.dto';
import { ContainerService } from './service/container.service';
import { ContainerServiceStub } from './service/container.service.stub';

describe('ContainerController', () => {
  let controller: ContainerController;
  let service: ContainerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContainerController],
      providers: [{ provide: ContainerService, useClass: ContainerServiceStub }],
    }).compile();

    controller = app.get<ContainerController>(ContainerController);
    service = app.get<ContainerService>(ContainerService);
  });

  describe('getSensorById', () => {
    const truckId: string = '0';
    const length: number = 1;
    let response: ContainerDto[];

    beforeEach(() => {
      spyOn(service, 'getContainers').and.callThrough();
      controller.getTruckContainers(truckId).subscribe(
        res => { response = res; },
      );
    });

    it('should call method getTemperatureRange from service class', () => {
      expect(service.getContainers).toHaveBeenCalledWith(truckId);
    });

    it('should return the object from mock', () => {
      expect(response).not.toBeUndefined();
      expect(response.length).toBe(length);
    });
  });
});
