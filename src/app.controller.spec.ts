import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  describe('getAppStatusReport', () => {
    const report: string = 'report';
    let reported: string;

    beforeEach(() => {
      spyOn(service, 'getAppReport').and.returnValue(report);
      reported = controller.getAppStatusReport();
    });

    it('should call method getAppReport from service class', () => {
      expect(service.getAppReport).toHaveBeenCalled();
    });

    it(`should return "${report}"`, () => {
      expect(reported).toBe(report);
    });
  });
});
