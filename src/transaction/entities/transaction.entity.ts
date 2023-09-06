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

    @Column({
        name: 'วันที่',
        type: 'date'
    })
    date: Date

    @Column({
        name: 'ลานจอด',
        nullable: false
    })
    parking_name: string

    @Column({
        name: 'ค่าจอด(บาท/30 นาที)',
        nullable: false
    })
    parking_costpermi: number

    @Column({
        name: 'ทางเข้า'
    })
    gate_nameIn: string

    @Column({
        name: 'เวลาเข้า',
        type: 'time'
    })
    time_in: Date

    @Column({
        name: 'เวลาออก(ฟรี)',
        type: 'time'
    })
    time_outNocash: Date

    @Column({
        name: 'ทางออก',
    })
    gate_nameOut: string

    @Column({
        name: 'เวลาออก',
        type: 'time'
    })
    time_out: Date

    @Column({
        name: 'เวลาที่จอด'
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