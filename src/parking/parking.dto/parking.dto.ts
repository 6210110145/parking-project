import { IsNotEmpty, IsString } from "class-validator";

export class ParkingDto {
    @IsNotEmpty()
    parking_id: number;

    @IsString()
    @IsNotEmpty()
    paking_name: string

    @IsNotEmpty()
    parking_costpermi: number

    @IsNotEmpty()
    parking_total: number

    createat: Date

    updateat: Date
}
