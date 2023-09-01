import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingDto } from './parking.dto/create-parking.dto';

@Controller('parking')
export class ParkingController {
    constructor(private parkingService: ParkingService ) {}

    @Post('create parking')
    createParking(@Body() parkingDto: ParkingDto) {
        return this.parkingService.createParking(parkingDto)
    }

    @Get()
    showParking() {
        return this.parkingService.ShowParking()
    }


}
