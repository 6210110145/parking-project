import { Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { GateService } from './gate.service';
import { GateDto } from './gate.dto/create-gate.dto';
import { UpdateGateDto } from './gate.dto/update-gate.dto';
import { Gate } from './entities/gate.entity';

@Controller('gates')
export class GateController {
    constructor(private gateService: GateService) {}

    // license_plateService 
    // createTransaction when license do not insert in Transaction
    // updateTransaction when license is inserted in Transaction

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
    
    @Patch(':gate_id')    //gate/{gate_id}
    async update(@Param('gate_id') gateId: number, 
           @Body() updateGateDto: UpdateGateDto
    ) {
        const gate = await this.gateService.findGateById(gateId)
        gate.gate_name = updateGateDto.gate_name,
        gate.gate_type = updateGateDto.gate_type

        return await this.gateService.updateGate(gate)
    }
    

    @Delete(':gate_id')
    removeGate(@Param('gate_id') gateID: number) {
        return this.gateService.removeGate(gateID)
    }
}
