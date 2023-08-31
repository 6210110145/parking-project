import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GateService } from './gate.service';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';

@Controller('gate')
export class GateController {
  constructor(private readonly gateService: GateService) {}

  @Post()
  create(@Body() createGateDto: CreateGateDto) {
    return this.gateService.createGate(createGateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gateService.remove(+id);
  }
}
