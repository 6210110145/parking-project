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
        name: 'เลขทะเบียน',
        nullable: false
    })
    car_license: string

    @Column({
        name: 'จังหวัด',
        nullable: false
    })
    car_province: string

    @CreateDateColumn({
        name: 'วันที่',
        type: 'date',
    })
    date: Date

    @Column({
        name: 'ลานจอด',
        nullable: true
    })
    parking_name: string

    @Column({
        name: 'ทางเข้า'
    })
    gate_nameIn: string

    @Column({
        name: 'เวลาเข้า',
        //type: 'timestamp without time zone',
        nullable: false
    })
    time_in: Date

    @Column({
        name: 'เวลาออก(ฟรี)',
        nullable: true
    })
    time_freeAt ?: Date

    @Column({
        name: 'ทางออก',
        nullable: true
    })
    gate_nameOut: string

    @Column({
        name: 'เวลาออก',
        //type: 'timestamp without time zone',
        nullable: true
    })
    time_out: Date

    @Column({
        name: 'เวลาที่จอด(นาที)',
        type: 'float4',
        nullable: true
    })
    time_total: number

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

    @OneToOne(() => Payment, (payment) => payment.transaction)
    //@JoinColumn()
    payment: Payment
}