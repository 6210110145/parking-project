import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingDto } from './parking.dto/create-parking.dto';
import { Parking } from './entities/parking.entity';
import { Gate } from 'src/gate/entities/gate.entity';

@Controller('parking')
export class ParkingController {
    constructor(private parkingService: ParkingService ) {}

    @Post()
    createParking(@Body() parkingDto: ParkingDto, _gates: Gate[]): Promise<Parking> {
        return this.parkingService.createParking(parkingDto, _gates)
    }

    @Get()
    showParking() {
        return this.parkingService.ShowParking()
    }


}
