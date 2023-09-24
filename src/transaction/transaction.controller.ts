import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GateService } from 'src/gate/gate.service';
import { Transaction } from './entities/transaction.entity';
import { Cameras } from 'src/camera/camera.interface';
import { Gate } from 'src/gate/entities/gate.entity';
import { Parking } from 'src/parking/entities/parking.entity';
import { ParkingService } from 'src/parking/parking.service';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';

@Controller('transactions')
export class TransactionController {
    constructor(
        private transactionService: TransactionService,
        private gateService: GateService,
        private parkingService: ParkingService,
        private paymentService: PaymentService) {}

    @Post(':gate_name') // 1. transaction/{camera_id} โดย {camera_id} == Gate1,2,3,... 
                        // 2. หรือ no {camera_id} และส่ง gate_name เพิ่ม
    async createTransaction(
        @Body() transactionDto: Cameras,
        @Param('gate_name') gateName: string
    ) {
        //let gate: Gate = await this.gateService.findGateByName(transactionDto.gate_name)
        let gate: Gate = await this.gateService.findGateByName(gateName)
        let parking: Parking = await this.parkingService.findParkingByGate(gateName)
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(transactionDto.car_license)
        let timeLimit: number = parking.parking_timeLimit // เวลาจอดที่ออกจากลานแล้วไม่เสียตังค์
        let timeIn: Date = new Date()
        let timeOutFree = new Date(timeIn.getTime() + (timeLimit * 60000))  // + n minutes
        /*console.log(parking.parking_name)
        console.log(gate.gate_type)
        console.log(parking.parking_name)
        console.log(parking.parking_timeLimit)*/
        
        if (gate.gate_type == "in") { 
            if((transaction == null) || 
               (transaction != null && transaction.time_out != null)) { //เข้าได้เมื่อ ไม่มีข้อมูลใน transaction หรือมีแต่ออกจากที่จอดรถ
                let newTransaction: Transaction = new Transaction()
                newTransaction.gate_nameIn = gate.gate_name
                newTransaction.car_license = transactionDto.car_license
                newTransaction.car_province = transactionDto.car_province
                newTransaction.parking_name = parking.parking_name
                newTransaction.time_in = timeIn
                newTransaction.time_freeAt = timeOutFree
                
                await this.transactionService.createTransactionIn(newTransaction)   // create Transaction
                await this.paymentService.createPayment(transactionDto.car_license) // create Payment
                return {
                    test: true,
                    Text: "Pass"
                }
            }else {
                return `This car ${transactionDto.car_license} is parking But not Exit`
            }        
        }
        if(gate.gate_type == 'out') {
            let timeCurrent: Date = new Date()
            let timeFree: Date = transaction.time_freeAt
            let payment: Payment = await this.paymentService.findPaymentByLicense(transactionDto.car_license)
            if((transaction != null) && (timeCurrent.valueOf() < timeFree.valueOf())){ //if == null รถคนนั้นไม่ได้จอดแต่แรก
                await this.transactionService.updateTransactionOut(
                    transactionDto.car_license,
                    gate.gate_name,
                    transaction.time_in)
                    
                return {
                    test: true
                }
            }/*else if(payment.payment_total == 0) {
                await this.transactionService.updateTransactionOut(
                    transactionDto.car_license,
                    gate.gate_name,
                    transaction.time_in)
                    
                return {
                    test: true,
                    Text: "Pass"
                }
            }*/else {
                return "Something is wrong"
            }
        }
    }

    @Get()
    async findAll() {
        let transaction = await this.transactionService.findAllTransaction()
        return transaction
    }
    /*
    @Get(":car_license")
    async findTransactionByLicense(@Param('car_license') license: string,
                                   //@Body() transactionDto: Cameras
                                   ) {
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(license)
        let timeIn:Date = transaction.time_in
        return await this.transactionService.updateTransactionTime(license, timeIn)
    }*/

    @Get(':car_license')
    async findTransaction(@Param('car_license') license: string) {
        return await this.transactionService.findTransactionbyLicense(license)
    }
}


