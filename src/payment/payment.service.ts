import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentDto } from './payment.dto/create-parking.dto';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment)
        private paymenstRepository: Repository<Payment>) {}

    createPayment(paymentDto: PaymentDto) {
        const newPay = this.paymenstRepository.create(paymentDto)
        return this.paymenstRepository.save(newPay)
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
}
