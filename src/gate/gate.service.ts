import { Injectable } from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';

@Injectable()
export class GateService {
  create(createGateDto: CreateGateDto) {
    return 'This action adds a new gate';
  }

  remove(id: number) {
    return `This action removes a #${id} gate`;
  }
}
