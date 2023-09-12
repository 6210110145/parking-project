import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { Repository } from 'typeorm';
import { GateDto } from './gate.dto/create-gate.dto';
import { ParkingService } from 'src/parking/parking.service';
import { UpdateGateDto } from './gate.dto/update-gate.dto';

@Injectable()
export class GateService {
    constructor(@InjectRepository(Gate)
        private gateRepository: Repository<Gate>,
        private pakingService: ParkingService) {}

    async createGate(gateDto: GateDto, parking_id: number) {
        let newGate: Gate = new Gate()
        newGate.gate_name = gateDto.gate_name,
        newGate.gate_type = gateDto.gate_type,
        newGate.parking = await this.pakingService.findParkingById(parking_id)

        return await this.gateRepository.save(newGate)
    }

    showGate() {
        return this.gateRepository.find({
            relations: {
                parking: true,
                transaction: true
            }
        })
    }

    findGateById(gateId: number) {
        return this.gateRepository.findOne({
            where: {gate_id: gateId}
        })
    }

    async findGateByName(gateName: string) {
        return await this.gateRepository.findOne({
            where: {gate_name: gateName},
            select: {gate_type: true}
        })
    }

    async updateGate(gateDto: UpdateGateDto) {
        const updateGate = this.gateRepository.create(gateDto)
        return await this.gateRepository.save(updateGate)
    }

    async removeGate(gateID: number) {
        return await this.gateRepository.delete(gateID)
    }
}
