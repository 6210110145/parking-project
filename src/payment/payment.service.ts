import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { TransactionService } from 'src/transaction/transaction.service';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment)
        private paymenstRepository: Repository<Payment>,
        private transactionService: TransactionService) {}

    async createPayment(license: string) {
        let newPayment: Payment = new Payment()
        newPayment.payment_total = 0
        newPayment.transaction = await this.transactionService.findTransactionbyLicense(license)

        return await this.paymenstRepository.save(newPayment)
    }

    findPaymentByLicense(license: string){
        return this.paymenstRepository.findOne({
            where: {
                transaction: {
                    car_license: license
                }
            }
        })
    }

    async showPayment(license: string) {
        let payment = await this.findPaymentByLicense(license)
        let transaction: Transaction = await this.transactionService.findTransactionbyLicense(license)
        return {
            "license": transaction.car_license,
            "province" : transaction.car_province,
            "parking" : transaction.parking_name,
            "time_in": transaction.time_in,
            "time_total" : transaction.time_total + " minutes", 
            "cost_total" : payment.payment_total + " Baht",
            "payment_type": payment.payment_type
        }
    }

    async updatePaymentCost(license: string, cost: number) {
        const payment = await this.findPaymentByLicense(license)
        
        payment.payment_total = cost

        await this.paymenstRepository.save(payment)
        //return await this.transactionService.showTransactionByLicense(license)
        return await this.showPayment(license)
    }

    async updatePayment(license: string, type: string, timeLimit: number) {
        let timeCurrent: Date = new Date()
        let payment = await this.findPaymentByLicense(license)
        payment.payment_total = 0
        payment.payment_type = type
        payment.payment_time = timeCurrent

        let check:boolean = await this.transactionService.updateTimeFreeAt(license, timeLimit)

        if(check == true){
            await this.paymenstRepository.save(payment)
        }else {
            return false
        }
        
        return await this.showPayment(license)
    }

    async removePayment(license: string) {
        let payment: Payment = await this.findPaymentByLicense(license)
        return await this.paymenstRepository.delete(payment.payment_id)
    }
}
