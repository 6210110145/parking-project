import { IsNotEmpty } from "class-validator"

export class CreateGateDto {
    @IsNotEmpty()
    gate_id: number

    @IsNotEmpty()
    gate_name: string
    
    @IsNotEmpty()
    gate_type: string

    gate_time: Date

    car_license: string

    car_province: string

    gate_createat: Date

    gate_updateat: Date
}
