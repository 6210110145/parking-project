import { Body, Controller, Get, Post } from '@nestjs/common';
import { CameraService } from './camera.service';
import { Cameras } from './camera.interface';

@Controller('cameras')
export class CameraController {
    constructor(
        private cameraService: CameraService
    ) {}

    @Post()
    async keepCamera(@Body() cameara: Cameras) {
        this.cameraService.createCamera(cameara)
    }

    @Get()
    async showAll():Promise<Cameras[]> {
        return this.cameraService.showAll()
    }
}
