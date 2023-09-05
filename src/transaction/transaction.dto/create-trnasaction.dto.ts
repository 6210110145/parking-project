import { IsNotEmpty } from "class-validator"

export class TransactionDto {
    @IsNotEmpty()
    transaction_id: number

    car_license: string

    car_province: string

    date: Date

    parking_name: string

    parking_costpermi: number

    gate_nameIn: string

    time_in: Date

    time_outNocash: Date

    gate_nameOut: string

    time_out: Date

    time_total: number

    transaction_createat: Date

    transaction_updateat: Date
}