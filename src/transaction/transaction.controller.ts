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
        /*console.log(parkingName.parking_name)
        console.log(gate.gate_type)
        console.log(gate.gate_name)*/
        
        if (gate.gate_type == "in") {
            let newTransaction: Transaction = new Transaction()
            newTransaction.gate_nameIn = gate.gate_name
            newTransaction.car_license = transactionDto.car_license
            newTransaction.car_province = transactionDto.car_province
            newTransaction.parking_name = parkingName.parking_name
          
            return this.transactionService.createTransactionIn(newTransaction)    
        }
        return {
            test: true
        }
    }

    @Get(':transaction_id')
    findOne(@Param('transaction_id') transactionId: number) {
        return this.transactionService.findTransactionById(transactionId)
    }
}


