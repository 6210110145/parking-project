import { Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { GateService } from './gate.service';
import { GateDto } from './gate.dto/create-gate.dto';

@Controller('gate')
export class GateController {
    constructor(private gateService: GateService) {}

    @Post(':parking_id')    //gate/{parking_id}
    createGate(@Body() gateDto: GateDto, 
               @Param('parking_id') parking_id: number) {
        return this.gateService.createGate(gateDto, Number(parking_id))
    }

    @Get()
    showGate() {
        return this.gateService.showGate()
    }

    @Get(':gate_id')
    findOne(@Param('gate_id') gateID: number) {
        return this.gateService.findGateById(gateID)
    }

    @Patch(':gate_id')       //gate/{gate_id}
    updateGate(gateId: number) {        
        return this.gateService.updateGate(gateId)
    }

    @Delete(':gate_id')
    removeGate(@Param('gate_id') gateID: number) {
        return this.gateService.removeGate(gateID)
    }
}
