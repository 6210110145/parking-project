import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { ParkingService } from 'src/parking/parking.service';
import { Payment } from './entities/payment.entity';
import { PaymentDto } from './payment.dto/create-parking.dto';

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

    @Patch(':car_license') //update cost_totall
    async updatePaymentCost(@Param('car_license') license: string) {
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(license)
        let timeTotal: number = transaction.time_total

        let parking = await this.parkingService.findParkingByGate(transaction.gate_nameIn)
        let cost: number = parking.parking_costpermi // 50 บาท/ 30 นาที

        let payTotal: number = 0
        
        //อัตราส่วนราคาจอดทั้งหมด **ขึ้นอยู่กับแต่ะละที่
        if(timeTotal > 30) {
            payTotal = ((timeTotal * cost) / 30)
        }else {
            payTotal = 0
        }
        
        return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
    }

    @Put(":car_license") // update after payment
    updatePayment(@Body() payment: PaymentDto, @Param('license_plate') license: string) {
        const type: string = payment.payment_type
        return this.paymentService.updatePayment(license, type)
    }

}
