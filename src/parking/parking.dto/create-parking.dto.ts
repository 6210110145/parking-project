import { IsNotEmpty, IsString } from "class-validator";
import { Gate } from "src/gate/entities/gate.entity";

export class ParkingDto {
    @IsNotEmpty()
    parking_id: number;

    @IsString()
    @IsNotEmpty()
    parking_name: string

    @IsNotEmpty()
    parking_costpermi: number

    @IsNotEmpty()
    parking_total: number
    
    @IsNotEmpty()
    parking_notEmpty: number

    createat: Date

    updateat: Date

    gates: Gate[]
}
