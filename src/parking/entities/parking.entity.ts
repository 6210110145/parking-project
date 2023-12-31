import { Gate } from "src/gate/entities/gate.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, 
        ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Parking')
export class Parking extends BaseEntity{
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
        name: 'total_slot',
        type: "integer",
        nullable: false
    })
    parking_total: number
    /*
    @Column({
        name: 'จำนวนช่องที่รถจอด',
        default: 0,
        nullable: false
    })
    parking_notEmpty: number
    */
    @Column({
        name: 'parking_fee',
        nullable: false
    })
    parking_costpermi: number

    @Column({
        name: 'timefree',
        type: "integer",
        nullable: false
    })
    parking_timeLimit: number
    /*
    @Column({
        name: 'maxCost',
        type: "integer",
        nullable: false
    })
    parking_costLimit: number
    */
    @CreateDateColumn()
    createat: Date

    @UpdateDateColumn()
    updateat: Date

    @OneToMany(() => Gate, gates => gates.parking)
    gates: Gate[]
    
    @ManyToOne(() => Transaction, transaction => transaction.parkings)
    transaction: Transaction
}