import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { Repository } from 'typeorm';
import { ParkingDto } from './parking.dto/create-parking.dto';

@Injectable()
export class ParkingService {
    constructor(@InjectRepository(Parking)
    private parkingReplository: Repository<Parking>) {}

    createParking(parkingDto: ParkingDto) {
        const newParking = this.parkingReplository.create(parkingDto)
        try{
            return this.parkingReplository.save(newParking)
        } catch(e) {
            throw new ConflictException({
                message: ['Username have been used']
            })
           } 
    }
}
