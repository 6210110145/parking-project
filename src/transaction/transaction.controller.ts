import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GateService } from 'src/gate/gate.service';
import { Transaction } from './entities/transaction.entity';
import { Cameras } from 'src/camera/camera.interface';
import { Gate } from 'src/gate/entities/gate.entity';
import { Parking } from 'src/parking/entities/parking.entity';
import { ParkingService } from 'src/parking/parking.service';

@Controller('transactions')
export class TransactionController {
    constructor(
        private transactionService: TransactionService,
        private gateService: GateService,
        private parkingService: ParkingService) {}

    @Post(':gate_name') //transaction/{camera_id} if {camera_id} == Gate1,2,3,...
    async createTransaction(
        @Body() transactionDto: Cameras,
        @Param('gate_name') gateName: string
    ) {
        let gate: Gate = await this.gateService.findGateByName(gateName)
        let parkingName: Parking = await this.parkingService.findParkingByGate(gateName)
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(transactionDto.car_license)
        /*console.log(parkingName.parking_name)
        console.log(gate.gate_type)*/
        console.log(gate.gate_type) 

        try {
            if (gate.gate_type == "in") {
                if(transaction == null) { //if ==null คือ ยังไม่มีป้ายนี้เข้า => เข้าได้
                    let newTransaction: Transaction = new Transaction()
                    let date: Date = new Date()
                    newTransaction.gate_nameIn = gate.gate_name
                    newTransaction.car_license = transactionDto.car_license
                    newTransaction.car_province = transactionDto.car_province
                    newTransaction.parking_name = parkingName.parking_name
                    newTransaction.time_in = date.toLocaleDateString()
                
                    await this.transactionService.createTransactionIn(newTransaction)

                    return {
                        test: true
                    }
                }else {
                    return `This car ${transactionDto.car_license} is parking But not Exit`
                }        
            }
            if(gate.gate_type == 'out') {
                if(transaction != null){ //if == null รถคนนั้นไม่ได้จอดแต่แรก
                    await this.transactionService.updateTransactionOut(
                        transactionDto.car_license,
                        gate.gate_name)
                    
                    return {
                        test: true
                    }
                }else {
                    return `This ${transactionDto.car_license} have not parked`
                }
            }
        }catch(e) {
            throw `Wrong gate`
        }
    }

    @Get()
    async findAll() {
        let transaction = await this.transactionService.findAllTransaction()
        return transaction
    }

}


