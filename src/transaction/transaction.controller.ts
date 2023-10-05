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
        
        if (gate.gate_type == "in") { 
            let transaction: Transaction = await this.transactionService.findTransactionbyLicenseV2(transactionDto.car_license)
            let timeLimit: number = parking.parking_timeLimit // เวลาจอดที่ออกจากลานแล้วไม่เสียตังค์
            let timeIn: Date = new Date()
            let timeOutFree = new Date(timeIn.getTime() + (timeLimit * 60000))  // + n minutes       
        
            if((transaction == null) // เข้าครั้งแรก => ไม่มีข้อมูลใน transaction
                //|| (transaction != null && transaction.time_out != null) หรือมีแต่ออกจากที่จอดรถแล้ว
                ) {
                let newTransaction: Transaction = new Transaction()

                newTransaction.gate_nameIn = gate.gate_name
                newTransaction.car_license = transactionDto.car_license
                newTransaction.car_province = transactionDto.car_province
                newTransaction.parking_name = parking.parking_name
                newTransaction.time_in = timeIn
                newTransaction.time_freeAt = timeOutFree
                newTransaction.gate_nameOut = "null"
                
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
            let transactionOut: Transaction = await this.transactionService.findTransactionbyLicenseV2(transactionDto.car_license)
            let timeFree: Date = transactionOut.time_freeAt

            if(timeCurrent.valueOf() < timeFree.valueOf()) { // ออกได้ ถ้าไม่เกินเวลาออกฟรี
                await this.transactionService.updateTransactionOut(
                    transactionDto.car_license,
                    gate.gate_name,
                    transactionOut.time_in)
                    
                return {
                    test: true
                }
            }else {
                return `Something is wrong \n ${transactionDto.car_license} may not pay`
            }
        }
    }

    @Get()
    async findAll() {
        let transaction = await this.transactionService.findAllTransaction()
        return transaction
    }

    @Get('/id/:transaction_id')
    async findTransactionByID(@Param('transaction_id') id: number) {
        return await this.transactionService.findTransactionById(id)
    }

    @Get(':car_license')
    async findTransaction(@Param('car_license') license: string) {
        return await this.transactionService.findTransactionbyLicenseV2(license)
    }

    @Get('license/:car_license')
    async findTransactionBylicense(@Param('car_license') license: string) {
        return await this.transactionService.findAllTransactionbyLicense(license)
    }

    @Get('payment/:car_license')
    async showTransactionBylicense(@Param('car_license') license: string) {
        return await this.transactionService.findOnceTransactionbyLicenseV2(license)
    }
}


