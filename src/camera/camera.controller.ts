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
    /*
    @Post('trascations')
    async creatCamera(@Body() cameara: Cameras) {
        const gateType = await this.gateService.findGateByName(cameara.gate_name)
        if(gateType.gate_type == 'in') {
            return this.transactionService.createTransactionIn(cameara)
        }
    }
    */

    @Get()
    async showAll():Promise<Cameras[]> {
        return this.cameraService.showAll()
    }
}
