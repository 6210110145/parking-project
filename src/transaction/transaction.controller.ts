import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto/create-transaction.dto';
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
        let transactionLicense = await this.transactionService.findTransactionbyLicense(transactionDto.car_license)
        /*console.log(parkingName.parking_name)
        console.log(gate.gate_type)
        console.log(transactionLicense) 
        */
        
        if (gate.gate_type == "in") {
            if(transactionLicense == null) { //if null == ยังไม่มีป้ายนี้เข้า => เข้าได้
                let newTransaction: Transaction = new Transaction()
                newTransaction.gate_nameIn = gate.gate_name
                newTransaction.car_license = transactionDto.car_license
                newTransaction.car_province = transactionDto.car_province
                newTransaction.parking_name = parkingName.parking_name
            
                await this.transactionService.createTransactionIn(newTransaction)

                return {
                    test: true,
                    
                }
            }else {
                return `This car ${transactionDto.car_license} is parking But not Exit`
            }        
        }
    }

    @Get()
    async findAll() {
        let transaction = await this.transactionService.findAllTransaction()
        return transaction
    }

}


