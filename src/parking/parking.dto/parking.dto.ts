import { IsNotEmpty, IsString } from "class-validator";

export class parkingDto {

    parking_id: number;

    @IsString()
    @IsNotEmpty()
    paking_name: string
}
