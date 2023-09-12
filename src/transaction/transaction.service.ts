import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto } from './transaction.dto/create-transaction.dto';
import { GateService } from 'src/gate/gate.service';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private gateService: GateService) {}
    
    async createTransactionIn(transaction: TransactionDto) {
        let newTransaction: Transaction = new Transaction()
            newTransaction.car_license = transaction.car_license
            newTransaction.car_province = transaction.car_province
            newTransaction.parking_name = transaction.parking_name
            newTransaction.gate_nameIn = transaction.gate_nameIn
        
        return await this.transactionRepository.save(newTransaction)
    }

    updateTransactionOut(transaction: TransactionDto) {
        
    }

    findTransactionById(transactionId: number) {
        return this.transactionRepository.findOne({
            where: { transaction_id: transactionId}
        })
    }
}
