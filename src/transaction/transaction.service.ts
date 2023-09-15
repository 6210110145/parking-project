import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository, Timestamp } from 'typeorm';
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

    async updateTransactionOut(license: string, gateName: string, timeIn: Date) {
        let timeOut:Date = new Date()
        let timeTotal = (timeOut.valueOf() - timeIn.valueOf());


        return await this.transactionRepository.update(
            {car_license: license},
            {
                gate_nameOut: gateName,
                time_out: timeOut,
                time_total: timeTotal
            }
        )
    }
}
