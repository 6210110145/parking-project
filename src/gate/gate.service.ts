import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';
import { Gate } from './entities/gate.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GateService {
  constructor(@InjectRepository(Gate)
      private gateRopository: Repository<Gate>) {}

  createGate(createGateDto: CreateGateDto) {
    const newGate = this.gateRopository.create(createGateDto)
    try {
      return this.gateRopository.save(newGate)
    } catch(e) {
      throw new ConflictException({
        message: ['Can not create']
    })
    }
  }

  remove(id: number) {
    return `This action removes a #${id} gate`;
  }
}
