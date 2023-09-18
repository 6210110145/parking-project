import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository} from 'typeorm';
import { TransactionDto } from './transaction.dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
) {}
    
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

    async updateTimeFreeAt(license: string) {
        const minutes = 30 // ไม่เกินกี่นาที ออกจากลานแล้วไม่เสียตังค์
        let timeCurrent: Date = new Date()
        let timeOutFree = new Date(timeCurrent.getTime() + (minutes * 60000))
        return await this.transactionRepository.update(
            {car_license: license},
            {time_freeAt: timeOutFree}
        )
    }

    async updateTransactionOut(license: string, gateName: string, timeIn: Date) {
        let timeOut:Date = new Date()
        let timeTotal:number = ((timeOut.valueOf() - timeIn.valueOf()) / 60000);

        return await this.transactionRepository.update(
            {car_license: license},
            {
                gate_nameOut: gateName,
                time_out: timeOut,
                time_total: Math.ceil(timeTotal) //float to integer
            }
        )
    }

    async updateTransactionTime(license: string, timeIn: Date, CostPark: number) {
        let timeCurrent: Date = new Date()
        let timeTotal: number = ((timeCurrent.valueOf() - timeIn.valueOf()) / 60000)

        return await this.transactionRepository.update(
            {car_license: license},
            {
                time_total: Math.ceil(timeTotal)
            }
        )
    }
}
