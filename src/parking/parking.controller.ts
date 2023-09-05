import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingDto } from './parking.dto/create-parking.dto';
import { Parking } from './entities/parking.entity';

@Controller('parking')
export class ParkingController {
    constructor(private parkingService: ParkingService ) {}

    @Post()
    createParking(@Body() parkingDto: ParkingDto) {
        return this.parkingService.createParking(parkingDto)
    }

    @Get()
    showParking() {
        return this.parkingService.showParking()
    }
    
    @Get(':parking_id')
    findOne(@Param('parking_id') id: string) {
    return this.parkingService.findParkingById(+id)
    }

}
