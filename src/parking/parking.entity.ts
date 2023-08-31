import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class ParkingEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'parking_id'
    })
    parking_id: number

    @Column({
        name: 'name',
        nullable: false
    })
    parking_name: string

    @Column({
        name: 'total slots',
        nullable: false
    })
    paparking_total: number
}