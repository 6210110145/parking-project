import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Post()
    createTransaction(@Body() transactionDto: TransactionDto) {
        
    }

    @Get(':transaction_id')
    findOne(@Param('transaction_id') transactionId: number) {
        return this.transactionService.findTransactionById(transactionId)
    }
}


