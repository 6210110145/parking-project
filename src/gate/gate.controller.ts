import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { GateService } from './gate.service';
import { GateDto } from './gate.dto/create-gate.dto';

@Controller('gate')
export class GateController {
    constructor(private gateService: GateService) {}

    @Post(':parking_id')
    createGate(@Body() gateDto: GateDto, 
               @Param('parking_id') parking_id: number) {
        return this.gateService.createGate(gateDto, Number(parking_id))
    }

    @Get()
    showGate() {
        return this.gateService.showGate()
    }

    @Delete(':gate_id')
    removeGate(@Param('gate_id') gateID: number) {
        return this.gateService.removeGate(gateID)
    }
}
