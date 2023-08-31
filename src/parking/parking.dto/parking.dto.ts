import { IsNotEmpty, IsString } from "class-validator";

export class parkingDto {
    @IsNotEmpty()
    parking_id: number;

    @IsString()
    @IsNotEmpty()
    paking_name: string

    parking_costpermi: number
    
    parking_total: number

    createat: Date

    updateat: Date
}
