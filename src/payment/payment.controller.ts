import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { ParkingService } from 'src/parking/parking.service';
import { Payment } from './entities/payment.entity';
import { PaymentDto } from './payment.dto/create-payment.dto';
import { Cameras } from 'src/camera/camera.interface';

@Controller('payments')
export class PaymentController {
    constructor(
        private paymentService: PaymentService,
        private transactionService: TransactionService,
        private parkingService: ParkingService) {}

    @Get(':car_license') //update cost_totall
    async updatePaymentCost(@Param('car_license') license: string) {
        let payment: Payment = await this.paymentService.findPaymentByLicense(license)
        let transaction: Transaction = await this.transactionService.findTransactionbyLicenseV2(license)
        let timeCurrent: Date = new Date()
        let timeIn: Date = transaction.time_in
        let timeFree: Date = transaction.time_freeAt
        
        let parking = await this.parkingService.findParkingByGate(transaction.gate_nameIn)
        let cost: number = parking.parking_costpermi // 50 บาท/ 30 นาที
        let timeLimit: number = parking.parking_timeLimit // 30 นาที

        let payTotal: number = 0
        
        let timeToatal:number = await this.transactionService.updateTransactionTime(license, timeIn)
        if(timeCurrent.valueOf() > timeFree.valueOf()) {
            console.log(timeToatal)
            if(payment.payment_type == "null") {
                payTotal = ((timeToatal * cost) / timeLimit)                                        // **ขึ้นอยู่กับแต่ละลาน**
                return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
            }else {
                let newPaymentTime: Date = payment.payment_time
                let newTimeTotal: number = ((timeCurrent.valueOf() - newPaymentTime.valueOf()) / 60000)  
                payTotal = ((newTimeTotal * cost) / timeLimit)                                      // **ขึ้นอยู่กับแต่ละลาน**
                return await this.paymentService.updatePaymentCostRepeat(license, Math.ceil(payTotal))
            }
        }else {
            return await this.paymentService.updatePaymentCost(license, 0)
        }        
    }

    @Get('/pay/:car_license')
    async showWhenPayment(@Param('car_license') license: string) {
        return await this.paymentService.showWhenPayment(license) 
    }

    @Put() // update after payment
    async updatePayment(@Body() payment: PaymentDto, @Body() transaction: Cameras) {
        let transactions: Transaction = await this.transactionService.findTransactionbyLicenseV2(transaction.car_license)
        let parking = await this.parkingService.findParkingByGate(transactions.gate_nameIn)
        let timeLimit: number = parking.parking_timeLimit
        
        const type: string = payment.payment_type
        return this.paymentService.updatePayment(transaction.car_license, type, timeLimit)
    }

    @Delete(':car_license')
    removePayment(@Param('car_license') license: string) {
        return this.paymentService.removePayment(license)
    }

}
