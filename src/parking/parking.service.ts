import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { Repository } from 'typeorm';
import { ParkingDto } from './parking.dto/create-parking.dto';

@Injectable()
export class ParkingService {
    constructor(@InjectRepository(Parking)
        private parkingRepository: Repository<Parking>) {}

    createParking(parkingDto: ParkingDto) {
        const newParking = this.parkingRepository.create(parkingDto)
        try{
            return this.parkingRepository.save(newParking)
        } catch(e) {
            throw new ConflictException({
                message: ['Can not create']
            })
        }
    }

    showParking() {
        return this.parkingRepository.find()
    }

    findParkingById(id: number) {
        return this.parkingRepository.findOne({ 
            where: {parking_id: id},
            relations: {gates: true}})
    }
}
