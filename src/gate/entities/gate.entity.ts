import { Parking } from "src/parking/entities/parking.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, 
        JoinColumn, ManyToOne, PrimaryGeneratedColumn, 
        UpdateDateColumn } from "typeorm";

@Entity('Gate')
export class Gate extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'gate_id'
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

    @CreateDateColumn()
    gate_createat: Date

    @UpdateDateColumn()
    gate_updateat: Date

    @ManyToOne(() => Parking, parking => parking.gates)
    parking: Parking

    @ManyToOne(() => Transaction, transaction => transaction.gates)
    transaction: Transaction
}