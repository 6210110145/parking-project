import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { Repository } from 'typeorm';
import { GateDto } from './gate.dto/create-gate.dto';

@Injectable()
export class GateService {
    constructor(@InjectRepository(Gate)
        private gateRepository: Repository<Gate>) {}

    createGate(gateDto: GateDto) {
        const newGate = this.gateRepository.create(gateDto)
        try{
            return this.gateRepository.save(newGate)
        } catch(e) {
            throw new ConflictException({
                message: ['Can not create']
            })
        } 
    }
}
