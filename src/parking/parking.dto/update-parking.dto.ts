import { PartialType } from '@nestjs/mapped-types';
import { ParkingDto } from './create-parking.dto';

export class UpdateParkingDto extends PartialType(ParkingDto) {}