import { IsNotEmpty } from "class-validator";

export class PaymentDto {
    @IsNotEmpty()
    payment_id: number

    payment_total?: number

    payment_type?: string

    payment_time?: Date

    /*
    payment_in?: number

    paymest_out?: number
    */

    payment_createat: Date

    payment_updateat: Date

    transaction_id: number
}