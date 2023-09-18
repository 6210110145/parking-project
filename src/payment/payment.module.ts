import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { TransactionModule } from 'src/transaction/transaction.module';
import { ParkingModule } from 'src/parking/parking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Payment]),
    forwardRef(() => TransactionModule),
    ParkingModule
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule {}
