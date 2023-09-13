import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { GateModule } from 'src/gate/gate.module';
import { ParkingModule } from 'src/parking/parking.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Transaction ]),
    GateModule],
  exports: [ TransactionService ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
