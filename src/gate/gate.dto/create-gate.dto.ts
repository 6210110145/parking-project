import { IsNotEmpty, IsString } from "class-validator";

export class GateDto {
    @IsNotEmpty()
    gate_id: number

    @IsNotEmpty()
    @IsString()
    gate_name: string

    @IsNotEmpty()
    @IsString()
    gate_type: string

    gate_createat: Date

    gate_updateat: Date

    parking_id: number

    transaction_id: number
}