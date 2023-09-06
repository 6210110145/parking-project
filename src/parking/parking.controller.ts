import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingDto } from './parking.dto/create-parking.dto';
import { Parking } from './entities/parking.entity';

@Controller('parkings')
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
    findOne(@Param('parking_id') parkingId: string) {
    return this.parkingService.findParkingById(+parkingId)
    }

    @Patch(':parking_id')   //parking/{parking_id}
    async updateParking(@Param('parking_id') parkingId: number,
                  @Body() parkingDto: ParkingDto
    ) {
        const parking = await this.parkingService.findParkingById(parkingId)
        parking.parking_name = parkingDto.parking_name,
        parking.parking_total = parkingDto.parking_total,
        parking.parking_costpermi = parkingDto.parking_costpermi,
        parking.parking_notEmpty = parkingDto.parking_notEmpty

        return await this.parkingService.createParking(parking)
    }

    @Delete(':parking_id')
    removeParking(@Param('parking_id') parkingId: string) {
        return this.parkingService.removeParking(+parkingId)
    }

}
