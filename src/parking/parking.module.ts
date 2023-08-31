import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingEntity } from './parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingEntity])],
  controllers: [ParkingController],
  providers: [ParkingService]
})
export class ParkingModule {}
