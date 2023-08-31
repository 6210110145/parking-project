import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class Gate extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'gate_id'
    })
    gate_id: number
}
