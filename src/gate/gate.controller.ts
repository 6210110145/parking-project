import { Body, Controller, Post } from '@nestjs/common';
import { GateService } from './gate.service';
import { GateDto } from './gate.dto/create-gate.dto';

@Controller('gate')
export class GateController {
    constructor(private gateService: GateService) {}

    @Post()
    createGate(@Body() gateDto: GateDto) {
        return this.gateService.createGate(gateDto)
    }
}
