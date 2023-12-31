import { IsDate, IsNotEmpty, IsString } from "class-validator"
import { Gate } from "src/gate/entities/gate.entity"
import { Parking } from "src/parking/entities/parking.entity"
import { Payment } from "src/payment/entities/payment.entity"

export class TransactionDto {
    @IsNotEmpty()
    transaction_id: number

    @IsString()
    car_license: string

    @IsString()
    car_province: string
    
    date: Date

    parking_name: string

    gate_nameIn: string

    time_in: Date

    time_freeAt : Date

    gate_nameOut: string

    time_out: Date

    time_total: number

    @IsDate()
    transaction_createat: Date

    @IsDate()
    transaction_updateat: Date

    parkings: Parking[]

    gates: Gate[]

    //payment: Payment[]
}