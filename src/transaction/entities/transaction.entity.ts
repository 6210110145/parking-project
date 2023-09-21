import { Gate } from "src/gate/entities/gate.entity";
import { Parking } from "src/parking/entities/parking.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, 
         OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'transaction_id'
    })
    transaction_id: number
    
    @Column({
        name: 'car_license',
        nullable: false
    })
    car_license: string

    @Column({
        name: 'car_province',
        nullable: false
    })
    car_province: string

    @CreateDateColumn({
        name: 'parking_date',
        type: 'date',
    })
    date: Date

    @Column({
        name: 'parking_name',
        nullable: true
    })
    parking_name: string

    @Column({
        name: 'gate_name_in'
    })
    gate_nameIn: string

    @Column({
        name: 'time_in',
        //type: 'timestamp without time zone',
        nullable: false
    })
    time_in: Date

    @Column({
        name: 'time_out_free',
        nullable: true
    })
    time_freeAt ?: Date

    @Column({
        name: 'time_out',
        nullable: true
    })
    gate_nameOut: string

    @Column({
        name: 'time_total',
        nullable: true
    })
    time_total: number

    @Column({
        name: 'time_out',
        //type: 'timestamp without time zone',
        nullable: true
    })
    time_out: Date

    @CreateDateColumn({
        type: 'timestamp without time zone'
    })
    transaction_createat: Date

    @UpdateDateColumn({
        type: 'timestamp without time zone'
    })
    transaction_updateat: Date

    @OneToMany(() => Gate, gates => gates.transaction)
    gates: Gate[]
    
    @OneToMany(() => Parking, parking => parking.transaction)
    parkings: Parking[]
    

    @OneToMany(() => Payment, payment => payment.transaction)
    payments: Payment[]
}