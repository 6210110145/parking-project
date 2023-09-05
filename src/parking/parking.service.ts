import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { Repository } from 'typeorm';
import { ParkingDto } from './parking.dto/create-parking.dto';
import { Gate } from 'src/gate/entities/gate.entity';

@Injectable()
export class ParkingService {
    constructor(@InjectRepository(Parking)
        private parkingRepository: Repository<Parking>) {}

    createParking(parkingDto: ParkingDto, _gates: Gate[]) {
        const {
            parking_name,
            parking_total,
            parking_notEmpty,
            parking_costpermi,
            gates
        } = parkingDto

        const newParking = this.parkingRepository.create({
            parking_name,
            parking_total,
            parking_notEmpty,
            parking_costpermi,
            gates 
        })
        //try{
        return this.parkingRepository.save(newParking)
        /*} catch(e) {
            throw new ConflictException({
                message: ['Can not create']
            })
        } */
    }

    ShowParking(): Promise<Parking[]> {
        return this.parkingRepository.find()
    }
}
