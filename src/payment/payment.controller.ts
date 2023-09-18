import { Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { ParkingService } from 'src/parking/parking.service';
import { Payment } from './entities/payment.entity';

@Controller('payments')
export class PaymentController {
    constructor(
        private paymentService: PaymentService,
        private transactionService: TransactionService,
        private parkingService: ParkingService) {}

    @Get(':car_license')
    findPaymenyByLicense(@Param('car_license') license: string){
        return this.paymentService.findPaymentByLicense(license)
    }

    @Patch(':car_license')
    async updatePayment(@Param('car_license') license: string) {
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(license)
        let timeTotal: number = transaction.time_total

        let parking = await this.parkingService.findParkingByGate(transaction.gate_nameIn)
        let cost: number = parking.parking_costpermi // 50 บาท/ 30 นาที
        
        
        
        return await this.paymentService.updatePayment(license, cost)
    }
}
