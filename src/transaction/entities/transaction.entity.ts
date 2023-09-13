import { Gate } from "src/gate/entities/gate.entity";
import { Parking } from "src/parking/entities/parking.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, 
         PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'transaction_id'
    })
    transaction_id: number
    
    @Column({
        name: 'เลขทะเบียน',
        nullable: false,
        unique: true
    })
    car_license: string

    @Column({
        name: 'จังหวัด',
        nullable: false,
        unique: true
    })
    car_province: string

    @CreateDateColumn({
        name: 'วันที่',
        type: 'date'
    })
    date: Date

    @Column({
        name: 'ลานจอด',
        nullable: true
    })
    parking_name: string

    @Column({
        name: 'ทางเข้า',
        nullable: true
    })
    gate_nameIn: string

    @CreateDateColumn({
        name: 'เวลาเข้า',
        type: 'time'
    })
    time_in: Date

    /*
    @Column({
        name: 'เวลาออก(ฟรี)',
        type: 'time'
    })
    time_outNocash: Date
    */

    @Column({
        name: 'ทางออก',
        nullable: true
    })
    gate_nameOut: string

    @Column({
        name: 'เวลาออก',
        type: 'time',
        nullable: true
    })
    time_out: Date

    @Column({
        name: 'เวลาที่จอด',
        nullable: true
    })
    time_total: number

    @CreateDateColumn()
    transaction_createat: Date

    @UpdateDateColumn()
    transaction_updateat: Date

    @OneToMany(() => Gate, gates => gates.transaction)
    gates: Gate[]

    @OneToMany(() => Parking, parking => parking.transaction)
    parkings: Parking[]
}