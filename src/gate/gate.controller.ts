import { Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { GateService } from './gate.service';
import { GateDto } from './gate.dto/create-gate.dto';
import { UpdateGateDto } from './gate.dto/update-gate.dto';
import { Gate } from './entities/gate.entity';

@Controller('gates')
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
    /*
    @Put(':gate_id')    //gate/{gate_id}
    update(@Param('gate_id') gate_id: number, @Body() updateUserDto: UpdateGateDto) {
    return this.gateService.updateGate(gate_id,updateUserDto);
    }
    */

    @Delete(':gate_id')
    removeGate(@Param('gate_id') gateID: number) {
        return this.gateService.removeGate(gateID)
    }
}
