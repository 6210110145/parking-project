import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto } from './transaction.dto/create-trnasaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>) {}
    
    createTransaction(transaction: TransactionDto) {
        const newTransaction = this.transactionRepository.create(transaction)
        return this.transactionRepository.save(newTransaction)
    }

    findTransactionById(transactionId: number) {
        return this.transactionRepository.findOne({
            where: { transaction_id: transactionId}
        })
    }
}
