import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingEntity } from './parking.entity';
import { Repository } from 'typeorm';
import { ParkingDto } from './parking.dto/parking.dto';

@Injectable()
export class ParkingService {
    constructor(@InjectRepository(ParkingEntity)
    private parkingReplository: Repository<ParkingEntity>) {}

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
