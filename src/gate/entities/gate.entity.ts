import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Gate')
export class Gate extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'parking_id'
    })
    gate_id: number

    @Column({
        name: 'name',
        nullable: false
    })
    gate_name: string

    @Column({
        name: 'in-out',
        nullable: false
    })
    gate_type: string

    @Column({
        name: 'time'
    })
    gate_time: Date

    @Column({
        name: 'ป้ายทะเบียน'
    })
    car_license: string

    @Column({
        name: 'จังหวัด'
    })
    car_province: string

    @Column()
    gate_createat: Date

    @Column()
    gate_updateat: Date
}