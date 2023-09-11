import { Body, Controller, Get, Post } from '@nestjs/common';
import { LicensePlateService } from './camera.service';
import { Cameras } from './camera.interface';

@Controller('cameras')
export class LicensePlateController {
    constructor(
        private licensePlateService: LicensePlateService
    ) {}

    @Post()
    async keepCamera(@Body() cameara: Cameras){
        this.licensePlateService.createCamera(cameara)
    }
}
