import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get(':transaction_id')
    findOne(@Param('transaction_id') transactionId: number) {
        return this.transactionService.findTransactionById(transactionId)
    }
}
