import { PartialType } from '@nestjs/mapped-types';
import { GateDto } from './create-gate.dto';

export class UpdateGateDto extends PartialType(GateDto) {}