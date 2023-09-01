import { Parking } from "src/parking/entities/parking.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, 
        ManyToOne, 
        PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        name: 'time',
        type: 'timestamp without time zone'
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

    @CreateDateColumn()
    gate_createat: Date

    @UpdateDateColumn()
    gate_updateat: Date

    @ManyToOne(() => Parking, parking => parking.gate)
    parking: Parking

    @Column()
    parking_id: number
}