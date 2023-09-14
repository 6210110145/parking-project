import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto } from './transaction.dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>) {}
    
    async createTransactionIn(transaction: TransactionDto) {
        const newTransaction = this.transactionRepository.create(transaction)
            
        return await this.transactionRepository.save(newTransaction)
    }

    async findAllTransaction() {
        return await this.transactionRepository.find()
    }

    async findTransactionById(transactionId: number) {
        return await this.transactionRepository.findOne({
            where: { 
                transaction_id: transactionId
            }
        })
    }

    async findTransactionbyLicense(license: string) {
        return await this.transactionRepository.findOne({
            where:{
                car_license: license
            }
        })
    }
}
