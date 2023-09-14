import { Body, Controller, Get, Post } from '@nestjs/common';
import { CameraService } from './camera.service';
import { Cameras } from './camera.interface';
import { GateService } from 'src/gate/gate.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('cameras')
export class CameraController {
    constructor(
        private cameraService: CameraService,
        private gateService: GateService,
        private transactionService: TransactionService
    ) {}

    @Post()
    createCamera(@Body() camera: Cameras) {
        return this.cameraService.createCamera(camera)
    }

    @Get()
    async showAll():Promise<Cameras[]> {
        return await this.cameraService.showAll()
    }
}
