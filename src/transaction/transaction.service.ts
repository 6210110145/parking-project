import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { IsNull, Not, Repository} from 'typeorm';
import { TransactionDto } from './transaction.dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
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
                transaction_id: transactionId,
                gate_nameOut: "null"
            },
            relations: {
                payments: true
            }
        })
    }

    async findTransactionbyLicense(license: string) {
        return await this.transactionRepository.findOne({
            where: {
                car_license: license,}
        })
    }

    async findAllTransactionbyLicense(license: string) {
        return await this.transactionRepository.find({
            where: {
                car_license: license,
                time_out: Not(IsNull())},
            relations: {
                payments: true
            }
        })
    }

    async findTransactionbyLicenseV2(license: string) {
        return await this.transactionRepository.findOneBy({
            car_license: license,
            gate_nameOut: "null"
        })
    }

    async findOnceTransactionbyLicenseV2(license: string) {
        return await this.transactionRepository.findOne({
            where: {
                car_license: license,
                gate_nameOut: "null"},
            relations: {
                payments: true
            }
        })
    }

    //update time_out_free after payment
    async updateTimeFreeAt(license: string, timeLimit: number) {
        let transaction: Transaction = await this.findTransactionbyLicenseV2(license)
        let timeCurrent: Date = new Date()
        let timeOutFree = new Date(timeCurrent.getTime() + (timeLimit * 60000))

        transaction.time_freeAt = timeOutFree

        await this.transactionRepository.save(transaction)

        return true
    }

    async updateTransactionOut(license: string, gateName: string, timeIn: Date) {
        let transactionOut: Transaction = await this.findTransactionbyLicenseV2(license)
        let timeOut:Date = new Date()
        let timeTotal:number = ((timeOut.valueOf() - timeIn.valueOf()) / 60000);

        transactionOut.gate_nameOut = gateName
        transactionOut.time_out = timeOut
        transactionOut.time_total = Math.ceil(timeTotal)

        return await this.transactionRepository.save(transactionOut)
    }

    //update only time_total
    async updateTransactionTime(license: string, timeIn: Date) {
        let transaction = await this.findTransactionbyLicenseV2(license)
        let timeCurrent: Date = new Date()
        let timeTotal: number = ((timeCurrent.valueOf() - timeIn.valueOf()) / 60000)

        transaction.time_total = Math.ceil(timeTotal)

        await this.transactionRepository.save(transaction)        
            //return await this.showTransactionByLicense(license)

        return timeTotal
        
    }
}
