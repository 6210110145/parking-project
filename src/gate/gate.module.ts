import { Module } from '@nestjs/common';
import { GateController } from './gate.controller';
import { GateService } from './gate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { ParkingModule } from 'src/parking/parking.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
    imports: [ TypeOrmModule.forFeature([Gate]), 
               ParkingModule],
    controllers: [GateController],
    providers: [GateService],
    exports: [GateService]
})
export class GateModule {}
