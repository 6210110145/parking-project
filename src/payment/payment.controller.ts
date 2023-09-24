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
    
    /*
    @Get(':car_license')
    findPaymenyByLicense(@Param('car_license') license: string){
        return this.paymentService.findPaymentByLicense(license)
    }*/

    @Get(':car_license') //update cost_totall
    async updatePaymentCost(@Param('car_license') license: string) {
        let payment: Payment = await this.paymentService.findPaymentByLicense(license)
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(license)
        let timeCurrent: Date = new Date()
        let timeIn: Date = transaction.time_in
        let timeFree: Date = transaction.time_freeAt
        //let check:boolean = 
        //let timeToatal:number = await this.transactionService.updateTransactionTime(license, timeIn)
        
        let parking = await this.parkingService.findParkingByGate(transaction.gate_nameIn)
        let cost: number = parking.parking_costpermi // 50 บาท/ 30 นาที
        let timeLimit: number = parking.parking_timeLimit // 30 นาที

        let payTotal: number = 0
        /*if(check == true){
            //console.log(transaction.time_total)
            //อัตราส่วนราคาจอดทั้งหมด **ขึ้นอยู่กับแต่ะละที่
            if (payment.payment_type == null) { // ยังไม่จ่าย
                if (transaction.time_total > timeLimit) { // เวลาจอดทั้งหมดเกินจากเวลาไม่จ่าย
                    payTotal = ((transaction.time_total * cost) / timeLimit)
                    return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
                }else {
                    payTotal = 0
                }
            }else if (payment.payment_type != null) { // จ่ายแล้วแต่เช็คซ้ำ
                if (timeCurrent.valueOf() > timeFree.valueOf()) { // เวลาปัจจุบันเกินเวลาที่ไม่ต้องจ่าย
                    let newPaymentTime: Date = payment.payment_time
                    let newTimeTotal: number = ((timeCurrent.valueOf() - newPaymentTime.valueOf()) / 60000)
                    //console.log(newTimeTotal)
                    payTotal = ((newTimeTotal * cost) / timeLimit)
                    return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
                }else {
                    payTotal = 0
                }
            }
        }else {
            return false
        }*/

        if(timeCurrent.valueOf() > timeFree.valueOf()) {
            let timeToatal:number = await this.transactionService.updateTransactionTime(license, timeIn)
            console.log(timeToatal)
            if(payment.payment_type == null) {
                payTotal = ((timeToatal * cost) / timeLimit)
                return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
            }else {
                let newPaymentTime: Date = payment.payment_time
                let newTimeTotal: number = ((timeCurrent.valueOf() - newPaymentTime.valueOf()) / 60000)
                //console.log(newTimeTotal)
                payTotal = ((newTimeTotal * cost) / timeLimit)
                return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
            }
        }else {
            return await this.paymentService.updatePaymentCost(license, 0)
        }
       
        //return await this.paymentService.updatePaymentCost(license, Math.ceil(payTotal))
        
    }

    @Put() // update after payment
    async updatePayment(@Body() payment: PaymentDto, @Body() transaction: Cameras) {
        let transactions: Transaction = await this.transactionService.findTransactionbyLicense(transaction.car_license)
        let parking = await this.parkingService.findParkingByGate(transactions.gate_nameIn)
        let timeLimit: number = parking.parking_timeLimit // 30 นาที
        
        const type: string = payment.payment_type
        return this.paymentService.updatePayment(transaction.car_license, type, timeLimit)
    }

    @Delete(':car_license')
    removePayment(@Param('car_license') license: string) {
        return this.paymentService.removePayment(license)
    }

}
