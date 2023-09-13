import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto/create-transaction.dto';
import { GateService } from 'src/gate/gate.service';
import { Transaction } from './entities/transaction.entity';
import { Cameras } from 'src/camera/camera.interface';

@Controller('transactions')
export class TransactionController {
    constructor(
        private transactionService: TransactionService,
        private gateService: GateService) {}

    @Post('cameras')
    async createTransaction(
        @Body() transactionDto: Cameras,
        @Param('gate_name') gateName: string
    ) {
        const gateType = await this.gateService.findGateByName(gateName)
        console.log(gateType)
        if (gateType.gate_type == 'in') {
            let newTransaction: Transaction = new Transaction()
            newTransaction.gate_nameIn = transactionDto.gate_name
            newTransaction.car_license = transactionDto.car_license
            newTransaction.car_province = transactionDto.car_province
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


