import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>) {}

    findTransactionById(transactionId: number) {
        return this.transactionRepository.findOne({
            where: { transaction_id: transactionId}
        })
    }
}
