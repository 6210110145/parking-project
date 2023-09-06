import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Parking]),
            TransactionModule],
  exports: [ParkingService],
  controllers: [ParkingController],
  providers: [ParkingService]
})
export class ParkingModule {}
