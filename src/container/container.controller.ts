import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContainerDto } from './dto/container.dto';
import { ContainerService } from './service/container.service';

@Controller('container')
export class ContainerController {

  constructor(private readonly service: ContainerService) { }

  @Get(':id')
  public getTruckContainers(@Param('id') truckId: string): Observable<ContainerDto[]> {
    return this.service.getContainers(truckId);
  }
}
