import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment)
        private paymenstRepository: Repository<Payment>,
        private transactionService: TransactionService) {}

    async createPayment(license: string) {
        let newPayment: Payment = new Payment()
        newPayment.transaction = await this.transactionService.findTransactionbyLicense(license)
        newPayment.payment_total = 0

        return await this.paymenstRepository.save(newPayment)
    }

    findPaymentByLicense(license: string){
        return this.paymenstRepository.findOne({
            where: {
                transaction: {
                    car_license: license
                }
            },
            relations: {transaction: true}
        })
    }

    async updatePayment(license: string, cost: number) {
        const payment = await this.findPaymentByLicense(license)
        payment.payment_total = cost

        return await this.paymenstRepository.save(payment)
    }
}
